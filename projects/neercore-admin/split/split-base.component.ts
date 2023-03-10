import { Injector } from '@angular/core';
import { IOutputAreaSizes } from 'angular-split';
import { StorageService } from '../../services/storage';
import { SettingsKey } from '../../services/storage/types';
import { ViewportService } from '../../theme/viewport.service';
import { ColumnInfo } from '../table/types';

export abstract class SplitBaseComponent<T> {
  private storage: StorageService;
  private device: ViewportService;

  splitSizes: [number, number] = [100, 0];

  protected constructor(injector: Injector, private splitSizesStorageKey: string) {
    this.storage = injector.get(StorageService);
    this.device = injector.get(ViewportService);

    this.splitSizes = this.storage.get(SettingsKey.SplitSizes + this.splitSizesStorageKey);
    if (!this.splitSizes || this.splitSizes.length !== 2) {
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

    this.storage.set(SettingsKey.SplitSizes + this.splitSizesStorageKey, this.splitSizes);

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
