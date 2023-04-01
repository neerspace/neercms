import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';
import { ITabContext, TabContext, TabKey } from '../types';

@Component({
  selector: 'nc-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent implements OnInit {
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('tabTitle') title: string = 'title';
  @Input() active: boolean = false;
  @Input() isCloseable = false;
  @Input() key!: TabKey;
  @Input() template!: TemplateRef<any>;
  @Input() data!: any;
  @Input() tabs!: TabsComponent;

  context!: ITabContext;

  ngOnInit(): void {
    this.context = new TabContext(this.key, this, this.tabs);
  }
}
