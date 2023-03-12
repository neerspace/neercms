import { Component, HostBinding, Input } from '@angular/core';
import { FormReady, FormReadyWrapper } from '../types';

@Component({
  selector: 'form[app-form-layout]',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss'],
  host: {
    class: 'form',
  },
})
export class FormLayoutComponent {
  @Input() ready!: FormReadyWrapper;
  @HostBinding('class.disable-browser-security') @Input() disableBrowserSecurity = false;
}
