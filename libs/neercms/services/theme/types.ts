export type ButtonStyle = 'outline' | 'filled';

export interface IThemeStyles {
  dark: boolean;
  buttons: ButtonStyle;
}

export interface IThemeInfo {
  displayName: string;
  stylesheet: string;
  icon?: string;
  styles?: IThemeStyles;
}

export type Themes<TTheme extends string = string> = {
  [key in TTheme]: IThemeInfo;
};
