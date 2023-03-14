import { Component, Injector, Input } from '@angular/core';
import { NumberPattern } from 'neercms/form/types';
import { NumberInputProcessorService } from 'neercms/services';
import { FieldBaseComponent } from '../field-base.component';

@Component({
  selector: 'nc-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['../field-shared.scss', './number-field.component.scss'],
})
export class NumberFieldComponent extends FieldBaseComponent {
  @Input() format: NumberPattern = 'integer';
  @Input() minValue: number = -Infinity;
  @Input() maxValue: number = Infinity;

  mask!: string;

  constructor(
    injector: Injector,
    private readonly numberInputProcessor: NumberInputProcessorService,
  ) {
    super(injector);
  }

  override afterInit() {
    this.mask = this.numberInputProcessor.patternToMask(this.format);
  }

  override onChange(event?: Event) {
    super.onChange(event);

    const value = +this.formControl.value;
    if (value < this.minValue) {
      this.formControl.setValue(this.minValue);
    } else if (value > this.maxValue) {
      this.formControl.setValue(this.maxValue);
    }
  }

  onKeyUp(event: Event): void {
    // To avoid a float numbers math hell
    function fuckJS(n: number, inc: number): number {
      const [integer, floating] = n.toString().split('.');
      return parseFloat(+integer + inc + '.' + floating);
    }

    if ((event as KeyboardEvent).key === 'ArrowUp') {
      this.formControl.setValue(fuckJS(this.formControl.value, 1));
      this.onChange();
    } else if ((event as KeyboardEvent).key === 'ArrowDown') {
      this.formControl.setValue(fuckJS(this.formControl.value, -1));
      this.onChange();
    }
  }
}
