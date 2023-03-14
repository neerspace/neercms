import { MediaMatcher } from '@angular/cdk/layout';
import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewportService {
  private mobileQuery: MediaQueryList;
  private tabletQuery: MediaQueryList;
  private screenSizeChange: EventEmitter<any> = new EventEmitter();

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 640px)');
    this.tabletQuery = media.matchMedia('(max-width: 900px)');
    const self = this;
    this.mobileQuery.addEventListener('change', () => {
      self.screenSizeChange.emit();
    });
  }

  get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  get isTablet(): boolean {
    return this.tabletQuery.matches;
  }

  get isDesktop(): boolean {
    return !this.tabletQuery.matches;
  }

  addResizeListener(listener: () => void): Subscription {
    return this.screenSizeChange.subscribe(listener);
  }

  dispose() {
    // this.screenSizeChange.unsubscribe();
  }
}
