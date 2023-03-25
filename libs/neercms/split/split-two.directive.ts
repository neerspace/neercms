import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ncSplitTwo]',
})
export class SplitTwoDirective {
  constructor(public readonly templateRef: TemplateRef<void>) {}
}
