import { Component, Input } from '@angular/core';
import { IMenuItem } from '../types';

@Component({
  selector: 'li[app-nav-item]',
  templateUrl: './sidebar-nav-item.component.html',
  styleUrls: ['./sidebar-nav-item.component.scss'],
})
export class SidebarNavItemComponent {
  @Input() item!: IMenuItem;
  @Input() inverse: boolean = false;

  getKey(text: string) {
    return text.replace(' ', '-');
  }
}
