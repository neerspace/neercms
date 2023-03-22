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
  LightAlt = 'light-alt',
}

export const themes: Themes<Theme> = {
  [Theme.Dark]: {
    displayName: 'Dark',
    stylesheet: 'bootstrap-dark',
    styles: {
      dark: true,
      buttons: 'outline',
    },
  },
  [Theme.Light]: {
    displayName: 'Light',
    stylesheet: 'bootstrap-light',
    styles: {
      dark: false,
      buttons: 'outline',
    },
  },
  [Theme.LightAlt]: {
    displayName: 'Light Colorful',
    stylesheet: 'bootstrap-light',
    styles: {
      dark: false,
      buttons: 'filled',
    },
  },
};
