import { Component, Injector, Input } from '@angular/core';
import { Size } from 'neercms/form/types';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-text-area-field',
  templateUrl: './text-area-field.component.html',
  styleUrls: ['../field-shared.scss', './text-area-input.component.scss'],
})
export class TextAreaFieldComponent extends FieldBaseComponent {
  @Input() size: Size = 'medium';
  @Input() maxLength: number = -1;

  constructor(injector: Injector) {
    super(injector);
  }
}
