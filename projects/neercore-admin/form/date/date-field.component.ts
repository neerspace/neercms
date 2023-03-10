import { Component, Injector, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateTime } from 'luxon';
import { FieldBaseComponent } from '../field-base.component';
import { DateTimeMode } from '../types';

@Component({
  selector: 'app-date-field',
  templateUrl: './date-field.component.html',
  styleUrls: ['../field-shared.scss', './date-field.component.scss'],
})
export class DateFieldComponent extends FieldBaseComponent {
  @Input() type: DateTimeMode = 'date';
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
