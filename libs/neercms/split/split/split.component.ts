import {
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IOutputAreaSizes } from 'angular-split';
import { NeerStorageService } from 'neercms/services/storage';
import { ViewportService } from 'neercms/services/viewport';
import { SplitOneDirective } from '../split-one.directive';
import { SplitTwoDirective } from '../split-two.directive';

export type SplitSizes = [number, number];

@Component({
  selector: 'nc-split',
  templateUrl: './split.component.html',
  styleUrls: ['./split.component.scss'],
})
export class SplitComponent implements OnInit {
  @ContentChild(SplitOneDirective) splitAreaOne!: SplitOneDirective;
  @ContentChild(SplitTwoDirective) splitAreaTwo!: SplitTwoDirective;

  @Input() storageKey!: string;
  @Input() sizes: SplitSizes = [100, 0];
  @Input() defaultSizes: SplitSizes = [100, 0];

  @Output() splitSizesChange: EventEmitter<SplitSizes> = new EventEmitter();

  private readonly storage: NeerStorageService = inject(NeerStorageService);
  private readonly device: ViewportService = inject(ViewportService);

  ngOnInit(): void {
    if (!this.storageKey) {
      throw new Error("Property 'storageKey' is required!");
    }

    this.setSizes(this.storage.getSplitSizes(this.storageKey));
  }

  resize(newSizes: SplitSizes | IOutputAreaSizes) {
    const firstSize = newSizes[0] as number;
    const secondSize = newSizes[1] as number;

    if (firstSize < 20 && firstSize < this.sizes[0]) {
      this.setSizes([0, 100]);
    } else if (secondSize < 20 && secondSize < this.sizes[1]) {
      this.setSizes([100, 0]);
    } else if (Math.abs(firstSize - secondSize) < 10) {
      this.setSizes([50, 50]);
    } else {
      this.setSizes([firstSize, secondSize]);
    }

    this.storage.setSplitSizes(this.storageKey, this.sizes);

    return this.sizes;
  }

  maximizeAreaOne() {
    if (this.device.isTablet) {
      this.sizes = this.resize([100, 0]);
    } else {
      this.sizes = this.resize([50, 50]);
    }
  }

  maximizeAreaTwo() {
    if (this.device.isTablet) {
      this.sizes = this.resize([0, 100]);
    } else {
      this.sizes = this.resize([50, 50]);
    }
  }

  closeForm() {
    this.sizes = this.resize([100, 0]);
  }

  private setSizes(sizes: SplitSizes | null) {
    if (!sizes || sizes.length !== 2) {
      sizes = this.defaultSizes;
    }
    this.sizes = sizes;
    this.splitSizesChange.emit(sizes);
  }
}
