import { Directive, Input, TemplateRef } from '@angular/core';
import { DataTableError } from 'neercms/table/types';

class TabTemplateContext {
  $implicit!: any;
}

@Directive({
  selector: '[ncTabTemplate]',
})
export class TabTemplateDirective {
  templateName!: string;

  @Input() set ncTabTemplate(templateName: string) {
    if (!templateName) {
      throw new DataTableError("ncTabTemplate' name must be specified!");
    }

    this.templateName = templateName;
  }

  constructor(public readonly templateRef: TemplateRef<TabTemplateContext>) {}
}
