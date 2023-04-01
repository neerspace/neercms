import { Injectable } from '@angular/core';
import { FormServiceBase } from 'neercms/form';
import { ISelectOption } from 'neercms/form/types';
import { IFiltered, IFilterInfo } from 'neercms/table/types';
import { Observable, of } from 'rxjs';

@Injectable()
export class ArticleService extends FormServiceBase {
  contentStatuses: ISelectOption[] = [];

  constructor() {
    super({
      id: ['', []],
      languageCode: ['', []],
      author: ['', []],
      title: ['', []],
      created: ['', []],
      views: ['', []],
      rate: ['', []],
      linkSample: ['https://google.com/'],
      // selectValue: ['', []],
    });
  }

  loadMetadata() {
    this.setReady('ready');
  }

  filter(request: IFilterInfo): Observable<IFiltered<any>> {
    return of({
      data: [
        {
          id: 123,
          languageCode: 'en',
          author: 'John Doe',
          title: 'Lorem Ipsum dolor sir emmet',
          rate: 233,
          views: 324344,
          created: '2023-03-01T12:34:00',
        },
        // {
        //   id: 124,
        //   languageCode: 'en',
        //   author: 'John Doe',
        //   title: 'Lorem Ipsum dolor sir TWO',
        //   rate: 23,
        //   views: 1300,
        //   created: '2023-03-01T12:34:00',
        // },
        // {
        //   id: 125,
        //   languageCode: 'es',
        //   author: 'Jak Pack',
        //   title: 'How to do what you do when you do?',
        //   rate: 23,
        //   views: 1300,
        //   created: '2023-03-01T12:34:00',
        // },
        // {
        //   id: 142,
        //   languageCode: 'ch',
        //   author: 'Petro Valadis',
        //   title: 'Prague city overview',
        //   rate: 23,
        //   views: 1300,
        //   created: '2023-03-01T12:34:00',
        // },
      ].map(x => ({
        ...x,
        linkSample: 'articles', //'https://google.com/' + x.languageCode,
      })),
      total: 121,
    });
  }

  update(): void {
    console.log('updated!');
  }

  delete(id: number): void {
    this.modals.showConfirmDelete({
      confirmed: () => {
        console.log('deleted!');
      },
    });
  }
}
