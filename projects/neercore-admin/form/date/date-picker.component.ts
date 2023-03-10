import { AfterViewInit, Component, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { DateTime } from 'luxon';
import { DateTimeMode, PickrMode } from '../types';

const minDate = new Date('1900-01-01');
const maxDate = new Date('2036-01-01');

type NullableDateTime = DateTime | null;

@Component({
  selector: 'input[app-date-picker]',
  template: ``,
})
export class DatePickerComponent implements AfterViewInit {
  @Input() date!: FormControl<NullableDateTime>;
  @Input() dateTo?: FormControl<NullableDateTime>;
  @Input() datePickerMode: DateTimeMode = 'date';

  private enableDate!: boolean;
  private enableTime!: boolean;
  private picker!: flatpickr.Instance;
  private internalDate?: NullableDateTime;
  private internalDateTo?: NullableDateTime;

  constructor(private currentElement: ElementRef) {}

  ngAfterViewInit(): void {
    const dateFrom = this.date.value as any;
    const dateTo = this.dateTo?.value as any;

    this.picker = flatpickr(this.currentElement.nativeElement, {
      mode: this.pickerMode,
      // inline: true,
      enableTime: this.enableTime,
      time_24hr: true,
      dateFormat: (this.enableDate ? 'd/m/Y ' : '') + (this.enableTime ? 'H:i' : ''),
      monthSelectorType: 'static',
      minDate: minDate,
      maxDate: maxDate,
      defaultDate:
        dateFrom && dateTo
          ? [DateTime.fromISO(dateFrom).toJSDate(), DateTime.fromISO(dateTo).toJSDate()]
          : dateFrom
          ? DateTime.fromISO(dateFrom).toJSDate()
          : undefined,
      locale: {
        // Start from Monday
        firstDayOfWeek: 1,
      },
      onMonthChange: this.onDateChange.bind(this),
      onChange: this.onDateChange.bind(this),
    });

    this.date.registerOnChange(this.formDate.bind(this));
    this.dateTo?.registerOnChange(this.formDateTo.bind(this));
  }

  onDateChange(event: Date[]): void {
    if (event.length === 0) {
      this.setDate(null);
      this.setDateTo(null);
    }

    if (event.length === 2) {
      this.setDateTo(DateTime.fromJSDate(event[1]));
    }

    this.setDate(DateTime.fromJSDate(event[0]));
  }

  get pickerMode(): PickrMode {
    if (this.datePickerMode === 'time') {
      this.enableTime = true;
      this.enableDate = false;
      return 'time';
    } else if (this.datePickerMode === 'date-range') {
      this.enableTime = false;
      this.enableDate = true;
      return 'range';
    } else {
      this.enableTime = this.datePickerMode === 'date-time';
      this.enableDate = true;
      return 'single';
    }
  }

  private setDate(value: NullableDateTime) {
    this.internalDate = value;
    this.date.setValue(value);
  }

  private setDateTo(value: NullableDateTime) {
    this.internalDateTo = value;
    this.dateTo?.setValue(value);
  }

  private formDate(value: NullableDateTime) {
    if (this.internalDate !== value) {
      if (!value) {
        this.picker.clear();
      } else if (this.internalDate) {
        this.picker.setDate([value.toJSDate(), this.internalDate.toJSDate()]);
      } else {
        this.picker.setDate(value.toJSDate());
      }
    }
  }

  private formDateTo(value: NullableDateTime) {
    if (this.internalDateTo !== value) {
      if (!value) {
        this.picker.clear();
      } else if (this.internalDateTo) {
        this.picker.setDate([value.toJSDate(), this.internalDateTo.toJSDate()]);
      } else {
        this.picker.setDate(value.toJSDate());
      }
    }
  }
}
