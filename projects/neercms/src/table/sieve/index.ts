import { DateTime } from 'luxon';
import { IDictionary } from '../../shared/types';

export interface IFilterFieldInfo {
  key: string;
  op: Operator;
  val: string;
}

export enum Operator {
  Equals = '==',
  EqualsIns = '==*',
  NotEquals = '!=',
  NotEqualsIns = '!=*',

  GreaterThen = '>',
  LessThen = '<',
  GreaterOrEquals = '>=',
  LessOrEquals = '<=',

  Contains = '@=',
  ContainsIns = '@=*',
  NotContains = '!@=',
  NotContainsIns = '!@=*',

  StartsWith = '_=',
  StartsWithIns = '_=*',
  NotStartsWith = '!_=',
  NotStartsWithIns = '!_=*',

  EndsWith = '_-=',
  EndsWithIns = '_-=*',
  NotEndsWith = '!_-=',
  NotEndsWithIns = '!_-=*',
}

export const textOperators: [Operator, string][] = [
  [Operator.EqualsIns, '=Abc'],
  // [Operator.NotEqualsIns, '!='],
  [Operator.ContainsIns, '..Abc..'],
  // [Operator.NotContainsIns, 'not _abc_'],
  [Operator.StartsWithIns, 'Abc...'],
  // [Operator.NotStartsWithIns, 'not Abc__'],
  [Operator.EndsWithIns, '...Abc'],
  // [Operator.NotEndsWithIns, 'not __abc'],
];

export const numberOperators: [Operator, string][] = [
  [Operator.Equals, '='],
  [Operator.NotEquals, '!='],
  // [Operator.GreaterThen, '>'],
  [Operator.GreaterOrEquals, '>'],
  // [Operator.LessThen, '<'],
  [Operator.LessOrEquals, '<'],
];

export const defaultTextOperator = textOperators[1][0];
export const defaultNumberOperator = numberOperators[0][0];

export const postfixes = {
  textOp: '(OPTt)',
  numOp: '(OPTn)',
  endPartOp: '(END)',
  isTextOp: (op: string) => op.endsWith(postfixes.textOp),
  isNumOp: (op: string) => op.endsWith(postfixes.numOp),
  isOp: (op: string) => postfixes.isTextOp(op) || postfixes.isNumOp(op),
  isEnd: (op: string) => op.endsWith(postfixes.endPartOp),
  removeOp: (op: string) => op.replace(postfixes.textOp, '').replace(postfixes.numOp, ''),
  removeEnd: (op: string) => op.replace(postfixes.endPartOp, ''),
};

export function buildFiltersQuery(options: IDictionary<string | number | DateTime>): string {
  const items = Object.entries(options);
  const operators = items
    .filter(x => postfixes.isOp(x[0] as string))
    .map(x => [postfixes.removeOp(x[0]), x[1]]);

  const queryParts: string[] = [];
  items
    .filter(x => !postfixes.isOp(x[0]))
    .forEach(([key, value]) => {
      if (!value && value !== 0) {
        return;
      }

      if (value instanceof DateTime) {
        if (!value.isValid) {
          return;
        }
        if (postfixes.isEnd(key)) {
          const op = Operator.LessThen;
          value = value.plus({ day: 1 }).toISODate(); // to include the last day in the range
          queryParts.push(postfixes.removeEnd(key) + op + value);
        } else {
          const op = Operator.GreaterOrEquals;
          queryParts.push(key + op + value.toISODate());
        }
      } else {
        const op = operators.find(x => x[0] === key)?.[1] || Operator.Equals;
        queryParts.push(key + op + (value === 0 ? 0 : value || ''));
      }
    });

  console.info(queryParts.join('\n'));
  return queryParts.join(',');
}

export function parseFiltersQuery(query: string | undefined): IFilterFieldInfo[] {
  const filters = query?.split(',');
  if (filters && filters.length > 0) {
    const result: IFilterFieldInfo[] = [];
    const availableOperators = Object.values(Operator).sort(x => -x.length);
    for (const filter of filters) {
      for (const operator of availableOperators) {
        if (filter.includes(operator)) {
          const sepIdx = filter.indexOf(operator);
          result.push({
            key: filter.substring(0, sepIdx),
            op: operator,
            val: filter.substring(sepIdx + operator.length, filter.length),
          });
          break;
        }
      }
    }
    return result;
  }

  return [];
}
