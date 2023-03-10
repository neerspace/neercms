import { Injectable } from '@angular/core';

interface IToastWrapper {
  toast: any;
  toastElm: HTMLDivElement;
  toastBodyElm: HTMLDivElement;
}

type ToastIcon = 'copy';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  private toastsArea: HTMLElement;
  private toasts: IToastWrapper[] = [];
  private index: number = 0;

  constructor() {
    this.toastsArea = document.getElementById('toasts-area') as HTMLDivElement;
    // Hate simple for loops
    this.toasts.push(this.createToast());
    this.toasts.push(this.createToast());
    this.toasts.push(this.createToast());
    this.toasts.push(this.createToast());
    this.toasts.push(this.createToast());
    this.toasts.push(this.createToast());
  }

  showSuccess(message: string, icon?: ToastIcon): void {
    this.show('success', message, icon, 4000);
  }

  showFail(message: string, icon?: ToastIcon): void {
    this.show('danger', message, icon, 20000);
  }

  showInfo(message: string, icon?: ToastIcon): void {
    this.show('info', message, icon, 10000);
  }

  private show(color: string, message: string, icon?: ToastIcon, lifetime: number = 5000): void {
    const toast = this.getNextToast();
    toast.toast._config.delay = lifetime;
    toast.toast.hide();
    toast.toastElm.dataset['color'] = color;
    toast.toastBodyElm.innerHTML = icon
      ? `<div class="icon"><i class="las la-${icon}"></i></div>${message}`
      : message;
    toast.toast.show();
  }

  private getNextToast(): IToastWrapper {
    if (this.index === this.toasts.length) {
      this.index = 0;
    }
    return this.toasts[this.index++];
  }

  private createToast(): IToastWrapper {
    const toastElm = document.createElement('div') as HTMLDivElement;
    toastElm.classList.add('toast');
    toastElm.ariaRoleDescription = 'alert';
    toastElm.ariaLive = 'assertive';
    toastElm.ariaAtomic = 'true';

    const toastBodyElm = document.createElement('div') as HTMLDivElement;
    toastBodyElm.classList.add('toast-body');
    toastElm.appendChild(toastBodyElm);
    this.toastsArea.appendChild(toastElm);

    const toast = bootstrap.Toast.getOrCreateInstance(toastElm, {
      animation: false,
      // autohide: false,
      // delay: 5000,
    });

    toastElm.onclick = () => {
      toast.hide();
    };

    return {
      toast: toast,
      toastElm: toastElm,
      toastBodyElm: toastBodyElm,
    };
  }
}
