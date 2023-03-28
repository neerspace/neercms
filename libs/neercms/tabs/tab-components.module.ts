import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabTemplateDirective } from './tab-template.directive';
import { TabComponent } from './tab/tab.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [TabTemplateDirective, TabComponent, TabsComponent],
  imports: [CommonModule],
  exports: [TabTemplateDirective, TabComponent, TabsComponent],
})
export class TabComponentsModule {}
