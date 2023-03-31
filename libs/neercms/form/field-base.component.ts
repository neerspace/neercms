import {
  Component,
  inject,
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
  @Input() controlUnlink: BoolInput = false;
  @Input() required: BoolInput = false;
  @Input() disabled: BoolInput = false;

  errors = errorMessages;
  formControl!: FormControl;
  changed: boolean = false;
  focused: boolean = false;

  public readonly copyPaste = inject(CopyPasteService);
  public readonly formGroup = inject(FormGroupDirective);

  ngOnInit(): void {
    // this.formGroup.form.error
    if (this.isTrue(this.controlUnlink)) {
      return;
    }
    if (!this.controlName) {
      throw new FormError(
        "A correct form control mast be linked to the field using 'controlName' property" +
          "If you want to left it unlinked, the 'controlUnlink' mast be explicitly set true",
      );
    }

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
    }, 1);
    this.afterInit();
  }

  ngOnChanges(changes: FormBaseChanges): void {
    if (changes.disabled && this.formControl) {
      if (this.isTrue(this.disabled)) {
        this.formControl.disable();
      } else {
        this.formControl.enable();
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
