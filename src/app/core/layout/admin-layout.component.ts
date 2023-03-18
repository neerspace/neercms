import { Component } from '@angular/core';
import { IMenuItem, MenuItems } from 'neercms/layout/types';
import { footerItems, items } from '../../_menu-items';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent {
  menuItems: MenuItems = items;
  footerMenu: IMenuItem = {
    text: 'Administrator',
    image: 'https://github.com/jurilents.png',
    collapseByDefault: true,
    children: footerItems,
  };
}
