import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { DateRangePicker } from 'vanillajs-datepicker';

@Component({
  selector: 'nc-date-range-picker',
  template: `
    <input />
    <input />
  `,
})
export class DateRangePickerComponent implements AfterViewInit {
  @ViewChild('fromDate') fromDate!: ElementRef;
  @ViewChild('fromDate') toDate!: ElementRef;

  @Input() date!: string;
  @Output() dateChange = new EventEmitter<string>();

  datepicker!: DateRangePicker;

  constructor(private currentElement: ElementRef) {}

  ngAfterViewInit(): void {
    this.datepicker = new DateRangePicker(this.currentElement.nativeElement, {
      allowOneSidedRange: true,
    });
    // this.datepicker.element.addEventListener('changeDate', (e: any) => {
    //   this.date = (e.detail.date as Date).toISOString().split('T')[0];
    //   this.dateChange.emit(this.date);
    // });
  }
}
