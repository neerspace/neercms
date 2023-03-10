import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { InputBaseComponent } from '../input-base.component';
import { Size } from '../types';

@Component({
  selector: 'app-text-area-input',
  template: `
    <textarea
      #input
      [formControl]="formControl"
      [id]="controlName"
      class="form-control {{ size }}"
      [attr.maxlength]="maxLength"
      (input)="onChange($event)"
      (focusin)="focused = true"
      (focusout)="focused = false"></textarea>
  `,
  styleUrls: ['../field-shared.scss', './text-area-input.component.scss'],
})
export class TextAreaInputComponent extends InputBaseComponent {
  @ViewChild('input') input!: ElementRef;

  @Input() size: Size = 'medium';
  @Input() maxLength: number = -1;

  constructor(form: FormGroupDirective) {
    super(form);
  }

  get value(): string {
    return this.input.nativeElement ? this.input.nativeElement.value : null;
  }

  set value(value: string) {
    this.input.nativeElement.value = value;
  }
}
