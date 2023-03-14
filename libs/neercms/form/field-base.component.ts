import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { FormError } from 'neercms/form/types';
import { CopyPasteService } from 'neercms/services';
import { BoolInput } from 'neercms/shared/types';
import { errorMessages } from './error-messages';

export type FormBaseChanges = SimpleChanges & { disabled: SimpleChange };

@Component({
  selector: 'field-base',
  template: ``,
})
export abstract class FieldBaseComponent implements OnInit, OnChanges {
  @Input() label!: string;
  @Input() controlName!: string;
  @Input() required: BoolInput = false;
  @Input() disabled: BoolInput = false;
  @Input() allowCopy: BoolInput = false;

  errors = errorMessages;
  formControl!: FormControl;
  changed: boolean = false;
  focused: boolean = false;

  public readonly copyPaste: CopyPasteService;
  public readonly formGroup: FormGroupDirective;

  protected constructor(injector: Injector) {
    this.copyPaste = injector.get(CopyPasteService);
    this.formGroup = injector.get(FormGroupDirective);
  }

  ngOnInit(): void {
    // this.formGroup.form.error

    this.formControl ??= this.formGroup.form.get(this.controlName) as FormControl;
    if (!this.formControl) {
      throw new FormError(`Form control for '${this.controlName}' not exists in FormGroup`);
    }

    setTimeout(() => {
      if (this.required === true || this.required === 'true') {
        this.formControl.addValidators(Validators.required);
      }

      if (this.isTrue(this.disabled)) {
        this.formControl.disable({ onlySelf: true });
      } else {
        this.formControl.enable({ onlySelf: true });
      }
    });
    this.afterInit();
  }

  ngOnChanges(changes: FormBaseChanges): void {
    if (changes.disabled && this.formControl) {
      if (this.isTrue(this.disabled)) {
        this.formControl.disable({ onlySelf: true });
      } else {
        this.formControl.enable({ onlySelf: true });
      }
    }
  }

  onChange(event?: Event): void {
    this.changed = true;
  }

  afterInit(): void {}

  isTrue(bool: BoolInput) {
    return bool === true || bool === 'true';
  }
}
