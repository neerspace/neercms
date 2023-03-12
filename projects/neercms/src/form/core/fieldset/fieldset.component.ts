import { Component, HostBinding, Input } from '@angular/core';
import { Size } from '../../types';

@Component({
  selector: 'app-fieldset',
  template: '<ng-content></ng-content>',
  styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent {
  @HostBinding('attr.size') @Input() size: Size = 'small';
}
