import { Component, Input } from '@angular/core';
import { FormGroupDirective, Validators } from '@angular/forms';
import { textOperators } from '../../table/sieve';
import { InputBaseComponent } from '../input-base.component';
import { InputType } from '../types';

@Component({
  selector: 'app-text-input-conditional',
  templateUrl: './text-input-conditional.component.html',
  styleUrls: ['./text-input-conditional.component.scss'],
})
export class TextInputConditionalComponent extends InputBaseComponent {
  @Input() type: InputType = 'text';
  @Input() maxLength: number = -1;

  textOperators = textOperators;

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
