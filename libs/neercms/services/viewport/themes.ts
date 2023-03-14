export enum ThemeName {
  Dark = 'dark',
  Light = 'light',
}

export type Themes = {
  [key in ThemeName]: IThemeInfo;
};

export interface IThemeInfo {
  name: ThemeName;
  className: string;
  icon: string;
  isDark: boolean;
}

export const themes: Themes = {
  [ThemeName.Dark]: {
    name: ThemeName.Dark,
    className: 'dark-theme',
    icon: 'dark_mode',
    isDark: true,
  },
  [ThemeName.Light]: {
    name: ThemeName.Light,
    className: 'light-theme',
    icon: 'light_mode',
    isDark: false,
  },
};
