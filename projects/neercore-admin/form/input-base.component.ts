import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { errorMessages } from '../../error-messages';

@Component({
  selector: 'input-base',
  template: ``,
})
export abstract class InputBaseComponent implements OnInit {
  @Input() controlName!: string;
  @Input() required: boolean = false;

  errors = errorMessages;
  formControl!: FormControl;
  changed: boolean = false;
  focused: boolean = false;

  protected constructor(protected formGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.formControl = this.formGroup.form.get(this.controlName) as FormControl;

    setTimeout(() => {
      if (this.required) {
        this.formControl.addValidators(Validators.required);
      }

      this.afterInit();
    });
  }

  onChange(event?: Event): void {
    this.changed = true;
  }

  afterInit(): void {}
}
