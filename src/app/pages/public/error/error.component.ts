import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { randomSadEmoji } from 'neercms/shared/utilities';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent {
  statusCode: number | string;
  sadEmoji: string;

  constructor(route: ActivatedRoute) {
    this.statusCode = +route.snapshot.params['code'];
    this.sadEmoji = randomSadEmoji();
  }

  get errorMessage(): string {
    switch (this.statusCode) {
      case 401:
        return 'Not Authorized';
      case 403:
        return 'Permission denied';
      case 404:
        return 'Not Found';
      default:
        if (this.statusCode >= 500 && this.statusCode <= 504) {
          return 'Internal Server Error';
        }

        setTimeout(() => (this.statusCode = '(X_X)'), 10);
        return 'Unknown Error';
    }
  }
}
