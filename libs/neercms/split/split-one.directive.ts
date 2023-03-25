import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ncSplitOne]',
})
export class SplitOneDirective {
  constructor(public readonly templateRef: TemplateRef<void>) {}
}
