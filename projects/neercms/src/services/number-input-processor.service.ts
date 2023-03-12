import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({ providedIn: 'any' })
export class NumberInputProcessorService {
  patternToMask(pattern: string | undefined): string {
    if (pattern === undefined || pattern === 'integer') {
      return 'separator.0';
    } else if (pattern === 'float') {
      return 'separator.12';
    } else if (pattern.startsWith('float')) {
      const accuracy = pattern.replace(/(^.*\(|\).*$)/g, '');
      return 'separator.' + accuracy;
    } else {
      return pattern;
    }
  }

  clampValue(formControl: FormControl, minValue?: number, maxValue?: number) {
    const value = +formControl.value;
    if (minValue && value < minValue) {
      formControl.setValue(minValue);
    } else if (maxValue && value > maxValue) {
      formControl.setValue(maxValue);
    }
  }

  onKeyUp(
    formControl: FormControl,
    minValue: number,
    maxValue: number,
    event: KeyboardEvent,
  ): void {
    // To avoid a float numbers math hell
    function fuckJS(n: number, inc: number): number {
      const [integer, floating] = n.toString().split('.');
      return parseFloat(+integer + inc + '.' + floating);
    }

    if (formControl.value === null || formControl.value === undefined) {
      return;
    }

    if (formControl.value === 0 && +event.key) {
      formControl.setValue(+event.key);
    } else if (event.key === 'ArrowUp') {
      formControl.setValue(fuckJS(formControl.value, 1));
      this.clampValue(formControl, minValue, maxValue);
    } else if ((event as KeyboardEvent).key === 'ArrowDown') {
      formControl.setValue(fuckJS(formControl.value, -1));
      this.clampValue(formControl, minValue, maxValue);
    }
  }
}
