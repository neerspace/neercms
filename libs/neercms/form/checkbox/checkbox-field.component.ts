import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-checkbox-field',
  templateUrl: './checkbox-field.component.html',
  styleUrls: ['./checkbox-field.component.scss', '../field-shared.scss'],
})
export class CheckboxFieldComponent extends FieldBaseComponent {
  override afterInit() {}
}
