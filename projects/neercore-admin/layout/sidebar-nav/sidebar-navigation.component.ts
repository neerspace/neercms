import { Component } from '@angular/core';

@Component({
  selector: 'ul[app-navigation]',
  template: `
    <ng-content></ng-content>
  `,
  host: {
    class: 'accordion nav nav-pills flex-column mb-auto',
  },
})
export class SidebarNavigationComponent {}
