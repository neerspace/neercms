import { Component, ElementRef, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { Variant } from 'neercms/services/viewport';

@Component({
  selector: 'button[nc-icon-button]',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  @HostBinding('class') get class() {
    const hasContent = !!this.currentElementRef.nativeElement.querySelector('span').innerHTML;
    const disabled = this.disabled ? 'disabled' : '';
    const type = hasContent ? '' : 'icon-only';
    return `btn btn-icon btn-outline-${this.variant} ${disabled} ${type}`;
  }

  @Input() variant: Variant = 'primary';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Output() onclick: EventEmitter<MouseEvent> = new EventEmitter();

  constructor(private readonly currentElementRef: ElementRef) {
    const button = currentElementRef.nativeElement as HTMLButtonElement;
    button.onclick = event => {
      // Perform click action only when button is not disabled
      if (this.onclick && !this.disabled) {
        this.onclick.emit(event);
      }
    };
  }
}
