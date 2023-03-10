import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreComponentsModule } from '../core/core-components.module';
import { FieldMessageComponent } from './core/field-message/field-message.component';
import { FieldsetComponent } from './core/fieldset/fieldset.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { DateFieldComponent } from './date/date-field.component';
import { DatePickerComponent } from './date/date-picker.component';
import { DateRangePickerComponent } from './date/date-range-picker.component';
import { FormContentComponent } from './form-content/form-content.component';
import { FormLayoutComponent } from './layout/form-layout.component';
import { NumberFieldComponent } from './number/number-field.component';
import { PasswordFieldComponent } from './password/password-field.component';
import { TextAreaFieldComponent } from './text-area/text-area-field.component';
import { TextAreaInputComponent } from './text-area/text-area-input.component';
import { TextInputConditionalComponent } from './text-input-conditional/text-input-conditional.component';
import { TextFieldComponent } from './text/text-field.component';
import { SelectFieldComponent } from './select/select-field.component';
import { CheckboxFieldComponent } from './checkbox/checkbox-field.component';

@NgModule({
  declarations: [
    FormLayoutComponent,
    NotFoundComponent,
    FieldMessageComponent,

    DatePickerComponent,
    DateRangePickerComponent,
    DateFieldComponent,

    TextFieldComponent,
    TextInputConditionalComponent,
    PasswordFieldComponent,

    TextAreaInputComponent,
    TextAreaFieldComponent,

    NumberFieldComponent,
    FormContentComponent,
    FieldsetComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
  ],
  exports: [
    FormLayoutComponent,

    DateFieldComponent,
    TextFieldComponent,
    PasswordFieldComponent,

    TextAreaInputComponent,
    TextAreaFieldComponent,

    NumberFieldComponent,
    DatePickerComponent,
    FormContentComponent,
    FieldsetComponent,
    SelectFieldComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot({
      validation: false,
    }),
    ReactiveFormsModule,
    FormsModule,
    CoreComponentsModule,
  ],
})
export class FormComponentsModule {}
