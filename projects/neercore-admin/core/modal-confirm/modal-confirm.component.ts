import { Component, HostBinding, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ModalsService } from 'app/services/viewport';
import { IModalInfo } from 'app/components/core/types';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss'],
  host: {
    class: 'modal fade',
  },
})
export class ModalConfirmComponent implements OnInit, OnDestroy {
  @HostBinding('class.show') show = false;

  info: IModalInfo = {
    title: 'Confirm Action',
    text: '',
    closeText: 'Close',
    closeVariant: 'secondary',
    confirmText: 'Confirm',
    confirmVariant: 'primary',
  };

  text?: string;

  constructor(private readonly modals: ModalsService) {}

  ngOnInit(): void {
    this.modals.current.subscribe(event => {
      if (!event.confirmed && !event.closed) {
        return;
      }

      this.show = true;
      this.info = event;
      this.info.closeText ??= 'Close';
      this.info.closeVariant ??= 'secondary';
      this.info.confirmText ??= 'Confirm';
      this.info.confirmVariant ??= 'primary';
    });
  }

  ngOnDestroy(): void {
    setTimeout(() => (this.show = false));
    if (this.info.closed) {
      this.info.closed();
    }
  }

  confirm() {
    setTimeout(() => (this.show = false));
    if (this.info.confirmed) {
      this.info.confirmed({ text: this.text });
    }
  }

  close() {
    setTimeout(() => (this.show = false));
    if (this.info.closed) {
      this.info.closed();
    }
  }

  @HostListener('window:keydown.Shift.Enter')
  enterEvent() {
    if (this.show) {
      this.confirm();
    }
  }

  @HostListener('window:keyup.Escape')
  escapeEvent() {
    if (this.show) {
      this.close();
    }
  }
}
