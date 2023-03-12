export interface IDictionary<T> {
  [id: string]: T;
}

export type BoolInput = boolean | 'true' | 'false';

export type RGB = `rgb(${number}, ${number}, ${number})`;
export type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type HEX = `#${string}`;

export type color = RGB | RGBA | HEX;
