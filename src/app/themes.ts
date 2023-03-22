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
  BootstrapLight = 'bootstrap-light',
  BootstrapDark = 'bootstrap-dark',
  // VSLight = 'VSLight',
  // Darcula = 'Darcula',
}

export const themes: Themes<Theme> = {
  [Theme.Dark]: {
    displayName: 'NetHub Dark',
    stylesheet: 'dark',
    styles: {
      dark: true,
      buttons: 'outline',
    },
  },
  [Theme.Light]: {
    displayName: 'Blue Light',
    stylesheet: 'bootstrap-dark',
    styles: {
      dark: false,
      buttons: 'filled',
    },
  },
  [Theme.BootstrapDark]: {
    displayName: 'Dark',
    stylesheet: 'bootstrap-dark',
    icon: 'light_mode',
    styles: {
      dark: true,
      buttons: 'outline',
    },
  },
  [Theme.BootstrapLight]: {
    displayName: 'Light',
    stylesheet: 'bootstrap-light',
    styles: {
      dark: false,
      buttons: 'filled',
    },
  },
  // [Theme.VSLight]: {
  //   displayName: 'Visual Studio Light',
  //   className: 'light',
  //   icon: 'light_mode',
  //   isDark: false,
  // },
  // [Theme.Darcula]: {
  //   displayName: 'JetBrains Darcula',
  //   className: 'dark',
  //   icon: 'dark_mode',
  //   isDark: true,
  // },
};
