import { Directive, Input, TemplateRef } from '@angular/core';
import { DataTableError } from 'neercms/table/types';

class ColumnTemplateContext {
  value!: any;
  object!: any;
}

@Directive({
  selector: '[ncColumnTemplate]',
})
export class ColumnTemplateDirective<T> {
  templateName!: string;

  @Input() set ncColumnTemplate(templateName: string) {
    if (!templateName) {
      throw new DataTableError("ncCustomColumn' name must be specified!");
    }

    this.templateName = templateName;
  }

  constructor(public readonly templateRef: TemplateRef<ColumnTemplateContext>) {}
}
