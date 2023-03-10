import { Component, HostBinding, Input } from '@angular/core';
import { footerItems, items } from '../../../_menu-items';
import { SettingsService } from '../../../services/settings.service';
import { StorageService } from '../../../services/storage';
import { IMenuItem, MenuItems } from '../types';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @HostBinding('class.collapsed') collapsed = false;

  @Input() menuItems: MenuItems = items;
  @Input() footerMenu: IMenuItem = {
    text: 'Administrator',
    image: 'https://github.com/jurilents.png',
    collapseByDefault: true,
    children: footerItems,
  };

  constructor(private storage: StorageService, public settings: SettingsService) {
    this.collapsed = this.storage.sidebarCollapsed;
  }

  toggleCollapsed(): void {
    this.storage.sidebarCollapsed = this.collapsed = !this.collapsed;
  }
}
