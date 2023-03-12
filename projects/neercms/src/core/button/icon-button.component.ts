import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Variant } from '../types';

@Component({
  selector: 'button[app-icon-button]',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @HostBinding('class') get class() {
    return 'btn btn-icon btn-outline-' + this.variant + (this.disabled ? ' disabled' : '');
  }

  @Input() variant: Variant = 'primary';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Output() onclick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(currentElementRef: ElementRef) {
    const button = currentElementRef.nativeElement as HTMLButtonElement;
    button.onclick = event => {
      // Perform click action only when button is not disabled
      if (this.onclick && !this.disabled) {
        this.onclick.emit(event);
      }
    };
  }
}
