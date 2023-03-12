import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';
import { FieldBaseComponent, FormBaseChanges } from '../field-base.component';
import { ISelectOption } from '../types';

type SelectFieldChanges = FormBaseChanges & { options: SimpleChange };

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss', '../field-shared.scss'],
})
export class SelectFieldComponent extends FieldBaseComponent implements OnChanges {
  private static notSelectedOption: ISelectOption = {
    key: null,
    title: 'Not Selected',
  };

  @Input() options: ISelectOption[] = [];
  @Input() selected!: ISelectOption;

  @Output() selectedChange: EventEmitter<ISelectOption> = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  override ngOnChanges(changes: SelectFieldChanges) {
    super.ngOnChanges(changes);
    if (changes.options) {
      if (!this.isTrue(this.required)) {
        this.options.unshift();
      }

      this.getOptionByFormValue();
    }
  }

  override afterInit() {
    if (!this.options) {
      this.selected = {
        key: null,
        title: 'No Options Provided',
      };
    } else {
      this.getOptionByFormValue();
    }

    this.formControl.valueChanges.subscribe(v => {
      this.getOptionByFormValue();
    });
  }

  onOptionSelect(option: ISelectOption) {
    this.selected = option;
    this.selectedChange.emit(option);
    this.formControl.setValue(option.key);
    option.onSelected?.(option);
  }

  private getOptionByFormValue() {
    const formValue = this.formControl?.value?.toString().toLowerCase();

    if (formValue && (!this.selected || this.selected.key !== formValue)) {
      this.selected =
        this.options.find(x => x.key?.toString().toLowerCase() === formValue) ??
        SelectFieldComponent.notSelectedOption;
    } else if (!this.selected) {
      this.selected = this.options[0];
    }
  }
}
