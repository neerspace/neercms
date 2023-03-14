import { Component, Injector } from '@angular/core';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['../field-shared.scss'],
})
export class PasswordFieldComponent extends FieldBaseComponent {
  showText: boolean = false;

  constructor(injector: Injector) {
    super(injector);
  }

  override afterInit() {}
}
