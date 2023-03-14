import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from 'neercms/services/viewport';

@Component({
  selector: 'app-loading-bar',
  template: ``,
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  @HostBinding('class.visible') visible = true;

  constructor(private loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.isLoading.subscribe(value => {
      this.visible = value;
      // console.log('loader visible:', this.visible);
    });
  }

  ngOnDestroy(): void {
    console.log('loader destroyed');
    // this.loader.isLoading.unsubscribe();
  }
}
