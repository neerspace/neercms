export interface IThemeInfo {
  displayName: string;
  className: string;
  icon: string;
  isDark: boolean;
}

export type Themes<TTheme extends string = string> = {
  [key in TTheme]: IThemeInfo;
};
