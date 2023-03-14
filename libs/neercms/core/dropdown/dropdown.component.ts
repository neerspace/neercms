import { Component, HostBinding, Input } from '@angular/core';
import { BoolInput } from 'neercms/shared/types';

@Component({
  selector: 'nc-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  host: {
    class: 'dropdown',
  },
})
export class DropdownComponent {
  @Input() key: string = '';
  @Input() buttonIcon?: string;
  @Input() buttonText!: any;
  @HostBinding('class.form-fit') @Input() formFit!: boolean;
  @Input() disabled: BoolInput = false;
}
