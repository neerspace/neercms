import { Component } from '@angular/core';
import { randomSadEmoji } from '../../../shared/utilities/common';

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
