import { IDictionary } from 'neercms/shared/types';

export interface IMenuItem {
  text: string;
  icon?: string;
  iconKind?: string;
  image?: string;
  collapseByDefault?: boolean;
  routerLink?: string;
  routerParams?: IDictionary<string | number | boolean>;
  stateData?: IDictionary<string | number | boolean>;
  children?: IMenuItem[];
}

export type MenuItems = IMenuItem[];
