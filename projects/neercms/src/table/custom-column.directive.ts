import { Directive, Input, TemplateRef } from '@angular/core';
import { DataTableError } from './types';

class CustomColumnContext {
  value!: any;
  object!: any;
}

@Directive({
  selector: '[appCustomColumn]',
})
export class CustomColumnDirective<T> {
  templateName!: string;

  @Input() set appCustomColumn(templateName: string) {
    if (!templateName) {
      throw new DataTableError("appCustomColumn' name must be specified!");
    }

    this.templateName = templateName;
  }

  constructor(public readonly templateRef: TemplateRef<CustomColumnContext>) {}
}
