import { Component, HostBinding, Input } from '@angular/core';
import { NeerStorageService } from 'neercms/services/storage';
import { IMenuItem, MenuItems } from 'neercms/layout/types';

@Component({
  selector: 'nc-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @HostBinding('class.collapsed') collapsed = false;

  @Input() menuItems!: MenuItems;
  @Input() footerMenu!: IMenuItem;
  @Input() logoPath!: string;
  @Input() logoTitle!: string;

  constructor(private readonly storage: NeerStorageService) {
    this.collapsed = this.storage.sidebarCollapsed;
  }

  toggleCollapsed(): void {
    this.storage.sidebarCollapsed = this.collapsed = !this.collapsed;
  }
}
