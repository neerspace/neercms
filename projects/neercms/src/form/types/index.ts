import { color } from '../../shared/types';

export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'phone'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime'
  | 'month';

export type Size = 'small' | 'medium' | 'large';

export type NumberPattern = 'integer' | 'float' | 'float(2)' | string;

export type DateTimeMode = 'date' | 'date-range' | 'date-time' | 'time';
export type PickrMode = 'time' | 'single' | 'multiple' | 'range' | undefined;

export type FormReady = null | 'ready' | 'loading' | '404';

export class FormReadyWrapper {
  private _state: FormReady = null;

  get state(): FormReady {
    return this._state;
  }

  set state(value: FormReady) {
    this._state = value;
  }

  toString() {
    return this._state;
  }

  valueOf() {
    return this._state === 'ready';
  }
}

export type FormId<T = number> = 'create' | T;

export interface ISelectOption {
  key: string | number | null;
  title: string;
  icon?: string;
  markerColor?: color | string;
  onSelected?: (option: ISelectOption) => void;
}

export class FormError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Custom Error of Form';
  }
}
