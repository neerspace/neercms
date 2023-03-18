import { Themes } from 'neercms/services/theme';

// export const themes: Themes = {
//   [Theme.Dark]: {
//     displayName: 'NetHub Dark',
//     className: 'dark-theme',
//     icon: 'dark_mode',
//     isDark: true,
//   },
//   [Theme.Light]: {
//     displayName: 'NetHub Light',
//     className: 'light-theme',
//     icon: 'light_mode',
//     isDark: false,
//   },
// };

export enum Theme {
  Dark = 'dark',
  Light = 'light',
  VSLight = 'VSLight',
  Darcula = 'Darcula',
}

export const themes: Themes<Theme> = {
  [Theme.Dark]: {
    displayName: 'NetHub Dark',
    className: 'dark',
    icon: 'dark_mode',
    isDark: true,
  },
  [Theme.Light]: {
    displayName: 'Blue Light',
    className: 'dark',
    icon: 'light_mode',
    isDark: false,
  },
  [Theme.VSLight]: {
    displayName: 'Visual Studio Light',
    className: 'light',
    icon: 'light_mode',
    isDark: false,
  },
  [Theme.Darcula]: {
    displayName: 'JetBrains Darcula',
    className: 'dark',
    icon: 'dark_mode',
    isDark: true,
  },
};
