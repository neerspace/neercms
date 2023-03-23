import { AfterViewInit, Component } from '@angular/core';
import { IMenuItem, MenuItems } from 'neercms/layout/types';
import { footerItems, items } from '../../_menu-items';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements AfterViewInit {
  menuItems: MenuItems = items;
  footerMenu: IMenuItem = {
    text: 'Administrator',
    image: 'https://github.com/jurilents.png',
    collapseByDefault: true,
    children: footerItems,
  };

  ngAfterViewInit() {
    // setInterval(() => this.incrementArticleIndicator(), 1000);
  }

  incrementArticleIndicator() {
    const indicator = this.menuItems
      .find(x => x.text === 'Application')
      ?.children?.find(x => x.text === 'Articles')?.indicator;
    if (indicator) {
      indicator.value = (indicator.value as number) * 2;
    } else {
      console.log('indicator', indicator);
    }
  }
}
