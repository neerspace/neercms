import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColumnInfo, DataTableError, FilterType } from '../types';
import { FormControl, FormGroupDirective } from '@angular/forms';
import { NumberInputProcessorService } from '../../../services/number-input-processor.service';
import {
  defaultNumberOperator,
  defaultTextOperator,
  numberOperators,
  postfixes,
  textOperators,
} from '../sieve';

export type FilterValue = string | number;

@Component({
  selector: 'app-table-filter-field',
  templateUrl: './table-filter-field.component.html',
  styleUrls: ['./table-filter-field.component.scss'],
})
export class TableFilterFieldComponent implements OnInit {
  @Input() column!: ColumnInfo | any;
  @Input() value!: FilterValue;

  @Output() valueChange: EventEmitter<FilterValue> = new EventEmitter();

  formControl!: FormControl;
  extraFormControl?: FormControl;

  FilterType = FilterType;
  textOperators = textOperators;
  numberOperators = numberOperators;

  constructor(
    private formGroup: FormGroupDirective,
    public numberInputProcessor: NumberInputProcessorService,
  ) {}

  ngOnInit(): void {
    if (this.column.filter === FilterType.number || this.column.filter === FilterType.optNumber) {
      const range = this.column.filterValueRange;
      if (range && range.from && range.to && range.from > range.to) {
        throw new DataTableError('Number input max value mast be greater then min value');
      }
    }
    if (!this.column.key) {
      const columnInfo = JSON.stringify(this.column, null, 2);
      throw new DataTableError(`Column 'key' mast be specified for ${columnInfo}`);
    }

    const formControl = this.formGroup.form.get(this.column.key) as FormControl | null;
    if (!formControl) {
      throw new DataTableError(
        `Column 'key' mast be a valid form entry name: '${this.column.key}'`,
      );
    }
    this.formControl = formControl;

    if (this.column.filter === FilterType.optText) {
      this.extraFormControl = this.formGroup.form.get(
        this.column.key + postfixes.textOp,
      ) as FormControl;
      setTimeout(() => this.extraFormControl!.setValue(defaultTextOperator));
    } else if (this.column.filter === FilterType.optNumber) {
      this.extraFormControl = this.formGroup.form.get(
        this.column.key + postfixes.numOp,
      ) as FormControl;
      setTimeout(() => this.extraFormControl!.setValue(defaultNumberOperator));
    } else if (this.column.filter === FilterType.dateRange) {
      this.extraFormControl = this.formGroup.form.get(
        this.column.key + postfixes.endPartOp,
      ) as FormControl;
    }
  }

  private get isNumberInput(): boolean {
    return this.column.filter === FilterType.number || this.column.filter === FilterType.optNumber;
  }

  onChange(event: any) {
    const value = event.target.value;

    if (this.isNumberInput) {
      if (!value) {
        this.formControl.setValue(null);
      } else {
        this.formControl.setValue(+value.replace(' ', ''));
        this.numberInputProcessor.clampValue(
          this.formControl,
          this.column.filterValueRange?.from,
          this.column.filterValueRange?.to,
        );
        event.target.value = this.formControl.value;
      }
    } else {
      this.formControl.setValue(value);
    }
  }

  onKeyUp(event: any): void {
    const value = event.target.value || '';

    if (!value) {
      this.formControl.setValue(null);
    } else {
      this.formControl.setValue(+value.replace(' ', ''));
    }

    this.numberInputProcessor.onKeyUp(
      this.formControl,
      this.column.filterValueRange?.from,
      this.column.filterValueRange?.to,
      event as KeyboardEvent,
    );
  }
}
