import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FieldBaseComponent, FormBaseChanges } from '../field-base.component';

@Component({
  selector: 'nc-action-field',
  templateUrl: './action-field.component.html',
  styleUrls: ['./action-field.component.scss', '../field-shared.scss'],
})
export class ActionFieldComponent extends FieldBaseComponent implements OnInit, OnChanges {
  @Input() icon: string = 'la-paperclip';

  @Output() action: EventEmitter<void> = new EventEmitter();

  override ngOnInit(): void {
    this.disabled = true;
    super.ngOnInit();
  }

  override ngOnChanges(changes: FormBaseChanges): void {
    if (changes.disabled) {
      this.disabled = true;
      this.formControl.disable();
    } else {
      super.onChange();
    }
  }
}
