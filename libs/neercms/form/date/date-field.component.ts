import { Component, Injector, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { DateTimeMode } from 'neercms/form/types';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['../field-shared.scss', './date-field.component.scss'],
})
export class DateFieldComponent extends FieldBaseComponent {
  @Input() format: DateTimeMode = 'date';
  @Input() controlEndName?: string;

  date!: DateTime;
  formControlEnd!: FormControl;

  constructor(injector: Injector) {
    super(injector);
  }

  override afterInit() {
    if (this.controlEndName) {
      this.formControlEnd = this.formGroup.form.get(this.controlEndName) as FormControl;
    }
  }
}
