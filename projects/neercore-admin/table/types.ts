import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { NumberPattern } from '../form/types';

export class DataTableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Custom Error of DataTable';
  }
}

export interface IFiltered<TModel> {
  total: number;
  data: TModel[] | null;
}

export enum FilterType {
  none = 'none',
  text = 'text',
  optText = 'opt-text',
  number = 'number',
  // numberRange = 'number-range',
  optNumber = 'opt-number',
  dateRange = 'dateRange',
  // time = 'time',
  // datetime = 'datetime',
  dropdown = 'dropdown',
  boolDropdown = 'boolDropdown',
}

export enum ColumnStyle {
  default,
  fillSized,
}

export interface IRange<T> {
  from?: T;
  to?: T;
}

export interface IButtonInfo {
  class: string;
  icon?: string;
  text?: string;
}

export interface ITableAction<T> {
  button: IButtonInfo;
  onClick: (context: any, val: T) => Observable<void> | void;
}

export type FetchApiEvent<T> = (params: IFilterInfo) => Observable<IFiltered<T>>;

export interface IFilterParams {
  page: number;
  limit: number;
  sort?: string;
  filter?: string;
}

export interface IFilterInfo {
  filters: string | undefined;
  sorts: string | undefined;
  page: number | undefined;
  pageSize: number | undefined;
}

// ========================================

export type FormatterFunc = (el: any, obj?: any) => string;

export interface Hideable {
  hideable?: boolean;
  hidden?: boolean;
}

export interface ActionButtonsColumn<T> {
  key?: string;
  title?: string;
  actions: ITableAction<T>[];
}

export interface ColumnBase {
  key: string;
  title: string;
  sortable?: boolean;
  filter: FilterType;
  style?: ColumnStyle;
}

interface TemplateColumn {
  template?: string;
  formatter?: never;
}

interface FormatterColumn {
  template?: never;
  formatter?: FormatterFunc;
}

export interface NoneFilter {
  filter: FilterType.none;
}

export interface BooleanFilter {
  filter: FilterType.boolDropdown;
}

export interface DropdownFilter {
  filter: FilterType.dropdown;
  options: string[];
  enum?: never;
}

// interface DropdownFilterWithEnum {
//   filter: FilterType.dropdown;
//   options?: never;
//   enum: any;
// }

export interface TextFilter {
  filter: FilterType.text | FilterType.optText;
  filterMaxLength?: number;
}

export interface NumberFilter {
  filter: FilterType.number | FilterType.optNumber;
  filterValueRange?: IRange<number>;
  numberPattern: NumberPattern;
}

export interface DateRangeFilter {
  filter: FilterType.dateRange;
  filterValueRange?: IRange<DateTime>;
}

export type ColumnInfo = Hideable &
  (
    | ActionButtonsColumn<any>
    | ((ColumnBase & (TemplateColumn | FormatterColumn)) &
        (
          | NoneFilter
          | BooleanFilter
          | DropdownFilter
          /*| DropdownFilterWithEnum*/
          | TextFilter
          | NumberFilter
          | DateRangeFilter
        ))
  );
