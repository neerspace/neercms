import { Component } from '@angular/core';
import { randomSadEmoji } from 'neercms/shared/utilities';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  sadEmoji: string;

  constructor() {
    this.sadEmoji = randomSadEmoji();
  }
}
