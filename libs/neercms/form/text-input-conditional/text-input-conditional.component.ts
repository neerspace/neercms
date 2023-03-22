import { Component, Input } from '@angular/core';
import { FormGroupDirective, Validators } from '@angular/forms';
import { InputType } from 'neercms/form/types';
import { InputBaseComponent } from '../input-base.component';

@Component({
  selector: 'nc-text-input-conditional',
  templateUrl: './text-input-conditional.component.html',
  styleUrls: ['./text-input-conditional.component.scss'],
})
export class TextInputConditionalComponent extends InputBaseComponent {
  @Input() type: InputType = 'text';
  @Input() maxLength: number = -1;

  textOperators = []; // TODO: textOperators!!!

  constructor(form: FormGroupDirective) {
    super(form);
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
