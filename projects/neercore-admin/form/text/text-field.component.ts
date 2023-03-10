import { Component, Injector, Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { BoolInput } from 'app/shared/types';
import { FieldBaseComponent } from 'app/components/form/field-base.component';
import { InputType } from 'app/components/form/types';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['../field-shared.scss'],
})
export class TextFieldComponent extends FieldBaseComponent {
  @Input() type: InputType = 'text';
  @Input() maxLength: number = -1;
  @Input() autocomplete: BoolInput = false;

  constructor(injector: Injector) {
    super(injector);
  }

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
