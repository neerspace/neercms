import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { MainContentComponent } from './main-content/main-content.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { SidebarNavItemComponent } from './sidebar-nav/sidebar-nav-item.component';
import { SidebarNavigationComponent } from './sidebar-nav/sidebar-navigation.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    SidebarNavigationComponent,
    SidebarNavItemComponent,
    MainHeaderComponent,
    MainContentComponent,
    AdminLayoutComponent,
  ],
  exports: [
    // Shared components
    SidebarComponent,
    MainHeaderComponent,
    MainContentComponent,
  ],
  imports: [
    // Angular Core
    CommonModule,
    RouterLinkWithHref,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class LayoutComponentsModule {}
