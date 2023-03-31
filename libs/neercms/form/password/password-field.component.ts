import { Component } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['../field-shared.scss'],
})
export class PasswordFieldComponent extends FieldBaseComponent {
  showText: boolean = false;

  override afterInit() {}
}
