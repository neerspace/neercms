import { Injectable } from '@angular/core';
import { StorageBase } from './storage-base';
import { NeerStorageKey } from './types';

@Injectable({ providedIn: 'root' })
export class NeerStorageService extends StorageBase<NeerStorageKey> {
  setSplitSizes(key: string, value: [number, number]) {
    this.setJsonItem(NeerStorageKey.SplitSizes, key, value);
  }

  getSplitSizes(key: string): [number, number] | null {
    return this.getJsonItem(NeerStorageKey.SplitSizes, key);
  }

  setColumnSequence(key: string, value: string[]) {
    this.setJsonItem(NeerStorageKey.ColumnSequences, key, value);
  }

  getColumnSequence(key: string): string[] | null {
    return this.getJsonItem(NeerStorageKey.ColumnSequences, key);
  }

  get sidebarCollapsed(): boolean {
    const value = this.getItem(NeerStorageKey.SidebarCollapsed);
    return value === 'hide';
  }

  set sidebarCollapsed(value: boolean) {
    this.setItem(NeerStorageKey.SidebarCollapsed, value ? 'hide' : 'show');
  }

  get theme(): string | null {
    return this.getItem(NeerStorageKey.Theme);
  }

  set theme(value: string | null) {
    this.setItem(NeerStorageKey.Theme, value);
  }
}
