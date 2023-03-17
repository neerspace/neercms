import { Injectable } from '@angular/core';
import { FormServiceBase } from 'neercms/form';

@Injectable({ providedIn: 'root' })
export class TestFormService extends FormServiceBase {
  constructor() {
    super({
      id: ['', []],
      name: ['', []],
    });
  }
}
