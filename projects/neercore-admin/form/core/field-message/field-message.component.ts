import { AfterViewInit, Component, ElementRef, HostBinding, Input } from '@angular/core';
import { Size } from '../../types';

@Component({
  selector: 'app-field-message',
  template: `
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner">{{ text }}</div>
  `,
  styleUrls: ['./field-message.component.scss'],
  host: {
    class: 'tooltip bs-tooltip-auto fade',
    'data-popper-placement': 'right',
  },
})
export class FieldMessageComponent implements AfterViewInit {
  @Input() @HostBinding('class.show') show: boolean = false;
  @Input() @HostBinding('class.warn') warn: boolean = false;
  @Input() @HostBinding('class.danger') error: boolean = false;
  @Input() text!: string | number;
  @Input() size: Size = 'large';

  constructor(private currentElementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.currentElementRef.nativeElement.classList.add(this.size);
  }
}
