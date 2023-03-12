import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
  @Input('tabTitle') title: string = 'title';
  @Input() active: boolean = false;
  @Input() isCloseable = false;
  @Input() key!: string;
  @Input() template!: TemplateRef<any>;
  @Input() dataContext!: any;
}
