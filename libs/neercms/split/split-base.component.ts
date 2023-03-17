import { inject } from '@angular/core';
import { IOutputAreaSizes } from 'angular-split';
import { NeerStorageService } from 'neercms/services/storage';
import { ViewportService } from 'neercms/services/viewport';
import { ColumnInfo } from 'neercms/table/types';

export abstract class SplitBaseComponent<T> {
  private readonly storage: NeerStorageService = inject(NeerStorageService);
  private readonly device: ViewportService = inject(ViewportService);

  splitSizes: [number, number] = [100, 0];

  protected constructor(private readonly splitSizesStorageKey: string) {
    this.splitSizes = this.storage.getSplitSizes(this.splitSizesStorageKey) || [100, 0];
    if (this.splitSizes.length !== 2) {
      this.splitSizes = [100, 0];
    }
  }

  abstract get columns(): ColumnInfo[];

  resize(newSizes: number[] | IOutputAreaSizes) {
    const firstSize = newSizes[0] as number;
    const secondSize = newSizes[1] as number;

    if (firstSize < 20 && firstSize < this.splitSizes[0]) {
      this.splitSizes = [0, 100];
    } else if (secondSize < 20 && secondSize < this.splitSizes[1]) {
      this.splitSizes = [100, 0];
    } else if (Math.abs(firstSize - secondSize) < 10) {
      this.splitSizes = [50, 50];
    } else {
      this.splitSizes = [firstSize, secondSize];
    }

    this.storage.setSplitSizes(this.splitSizesStorageKey, this.splitSizes);

    return this.splitSizes;
  }

  maximizeForm() {
    if (this.device.isTablet) {
      this.splitSizes = this.resize([0, 100]);
    } else {
      this.splitSizes = this.resize([50, 50]);
    }
  }

  closeForm() {
    this.splitSizes = this.resize([100, 0]);
  }
}
