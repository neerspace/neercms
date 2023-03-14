import { Component } from '@angular/core';

@Component({
  selector: 'nc-toast-area',
  templateUrl: './toast-area.component.html',
  styleUrls: ['./toast-area.component.scss'],
  host: {
    'aria-atomic': 'true',
    'aria-live': 'polite',
  },
})
export class ToastAreaComponent {}
