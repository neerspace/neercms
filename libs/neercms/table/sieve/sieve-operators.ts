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
