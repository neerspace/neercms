import { Component, Injector, Input } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';
import { Size } from '../types';

@Component({
  selector: 'app-text-area-field',
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
