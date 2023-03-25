import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularSplitModule } from 'angular-split';
import { SplitOneDirective } from './split-one.directive';
import { SplitTwoDirective } from './split-two.directive';
import { SplitComponent } from './split/split.component';

@NgModule({
  declarations: [SplitComponent, SplitOneDirective, SplitTwoDirective],
  imports: [CommonModule, AngularSplitModule],
  exports: [SplitComponent, SplitOneDirective, SplitTwoDirective],
})
export class SplitComponentsModule {}
