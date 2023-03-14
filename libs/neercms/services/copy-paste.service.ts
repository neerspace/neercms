import { Injectable } from '@angular/core';
import { ToasterService } from 'neercms/services/viewport';

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript

@Injectable({ providedIn: 'root' })
export class CopyPasteService {
  constructor(private toaster: ToasterService) {}

  copyToClipboard(text: string): void {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => this.showSuccessToast())
        .catch(() => this.showFailToast());
    } else {
      this.fallbackCopyTextToClipboard(text);
    }
  }

  private showFailToast() {
    this.toaster.showFail('Something went wrong while copying text', 'copy');
  }

  private showSuccessToast() {
    this.toaster.showInfo('Text copied to your clipboard', 'copy');
  }

  private fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let successful = false;
    try {
      successful = document.execCommand('copy');
      // console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
    successful ? this.showSuccessToast() : this.showFailToast();
  }
}
