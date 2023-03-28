import { Component, Input, TemplateRef } from '@angular/core';
import { TabKey } from '../tabs/tabs.component';

@Component({
  selector: 'nc-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input('tabTitle') title: string = 'title';
  @Input() active: boolean = false;
  @Input() isCloseable = false;
  @Input() key!: TabKey;
  @Input() template!: TemplateRef<any>;
  @Input() data!: any;
}
