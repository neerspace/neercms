import { Component, HostBinding, Input } from '@angular/core';
import { Size } from 'neercms/form/types';

@Component({
  selector: 'nc-fieldset',
  template: '<ng-content></ng-content>',
  styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent {
  @HostBinding('attr.size') @Input() size: Size = 'small';
  @HostBinding('class.fields-row') @Input() row: boolean = false;
}
