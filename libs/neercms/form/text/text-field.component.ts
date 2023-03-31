import { Component, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { InputType } from 'neercms/form/types';
import { BoolInput } from 'neercms/shared/types';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['../field-shared.scss'],
})
export class TextFieldComponent extends FieldBaseComponent {
  @Input() type: InputType = 'text';
  @Input() maxLength: number = -1;
  @Input() autocomplete: BoolInput = false;
  @Input() allowCopy: BoolInput = false;

  override afterInit() {
    if (this.maxLength > 0) {
      this.formControl.addValidators(Validators.maxLength(+this.maxLength));
    }

    setTimeout(() => {
      if (this.type === 'email') {
        this.formControl.addValidators(Validators.email);
      }
    });
  }
}
