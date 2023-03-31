import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { CoreComponentsModule } from 'neercms/core';
import { NgxMaskModule } from 'ngx-mask';
import { ActionFieldComponent } from './action/action-field.component';
import { CheckboxFieldComponent } from './checkbox/checkbox-field.component';
import { FieldMessageComponent } from './core/field-message/field-message.component';
import { FieldsetComponent } from './core/fieldset/fieldset.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { DateFieldComponent } from './date/date-field.component';
import { DatePickerComponent } from './date/date-picker.component';
import { DateRangePickerComponent } from './date/date-range-picker.component';
import { FormContentComponent } from './form-content/form-content.component';
import { FormComponent } from './form/form.component';
import { LinkFieldComponent } from './link/link-field.component';
import { NumberFieldComponent } from './number/number-field.component';
import { PasswordFieldComponent } from './password/password-field.component';
import { SelectFieldComponent } from './select/select-field.component';
import { TextAreaFieldComponent } from './text-area/text-area-field.component';
import { TextAreaInputComponent } from './text-area/text-area-input.component';
import { TextFieldComponent } from './text/text-field.component';

@NgModule({
  declarations: [
    FormComponent,
    FormContentComponent,
    FieldsetComponent,
    NotFoundComponent,
    FieldMessageComponent,

    DatePickerComponent,
    DateRangePickerComponent,
    DateFieldComponent,

    TextFieldComponent,
    PasswordFieldComponent,
    TextAreaInputComponent,
    TextAreaFieldComponent,

    NumberFieldComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
    LinkFieldComponent,
    ActionFieldComponent,
  ],
  exports: [
    FormComponent,
    FieldsetComponent,
    FormContentComponent,

    DateFieldComponent,
    DatePickerComponent,

    TextFieldComponent,
    PasswordFieldComponent,
    TextAreaInputComponent,
    TextAreaFieldComponent,

    NumberFieldComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
    LinkFieldComponent,
    ActionFieldComponent,
  ],
  imports: [
    CommonModule,
    NgxMaskModule.forRoot({
      validation: false,
    }),
    ReactiveFormsModule,
    FormsModule,
    CoreComponentsModule,
    RouterLinkWithHref,
  ],
})
export class FormComponentsModule {}
