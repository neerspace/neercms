import { Variant } from 'neercms/services/viewport';
import { IDictionary } from 'neercms/shared/types';

export interface IMenuIndicator {
  variant: Variant;
  value: number | string;
}

export interface IMenuItem {
  key?: string;
  text: string;
  icon?: string;
  iconKind?: string;
  image?: string;
  hidden?: boolean;
  indicator?: IMenuIndicator;
  collapseByDefault?: boolean;
  routerLink?: string;
  routerParams?: IDictionary<string | number | boolean>;
  stateData?: IDictionary<string | number | boolean>;
  children?: IMenuItem[];
}

export type MenuItems = IMenuItem[];
