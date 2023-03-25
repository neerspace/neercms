import { Component, HostBinding, Input } from '@angular/core';
import { FormReadyWrapper } from 'neercms/form/types';

@Component({
  selector: 'form[ncForm]',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  host: {
    class: 'form',
  },
})
export class FormComponent {
  @Input() ready!: FormReadyWrapper;
  @HostBinding('class.disable-browser-security') @Input() disableBrowserSecurity = false;
}
