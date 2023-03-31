import { MenuItems } from 'neercms/layout/types';

export const items: MenuItems = [
  {
    text: 'Dashboard',
    icon: 'la-chalkboard',
    routerLink: '/dashboard',
  },
  {
    text: 'Application',
    iconKind: 'lar',
    icon: 'la-star',
    children: [
      {
        hidden: true,
        routerLink: '/users',
        text: 'Users',
        icon: 'la-user-friends',
        indicator: {
          variant: 'primary',
          value: 10,
        },
      },
      {
        routerLink: '/articles',
        text: 'Articles',
        icon: 'la-book',
        indicator: {
          variant: 'warning',
          value: 199,
        },
      },
    ],
  },
  {
    text: 'System',
    icon: 'la-tools',
    children: [
      { hidden: true, routerLink: '/roles', text: 'Roles', icon: 'la-key' },
      { hidden: true, routerLink: '/languages', text: 'Languages', icon: 'la-globe-africa' },
    ],
  },
];

export const footerItems: MenuItems = [
  { text: 'Account', icon: 'la-user', routerLink: '/profile/edit' },
  { text: 'Settings', icon: 'la-cog', routerLink: '/profile/settings' },
  { text: 'Log Out', icon: 'la-sign-out-alt', routerLink: '/login', stateData: { logout: true } },
];
