import { Component } from '@angular/core';
import { ColumnInfo, FilterType, IFilterInfo } from 'neercms/table/types';
import { Observable, of } from 'rxjs';
import { formatAsDate, formatAsText } from '../../../libs/neercms/table/utilities/formatters';

@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.scss'],
})
export class TestTableComponent {
  columns: ColumnInfo[] = [
    {
      key: 'id',
      title: 'Id',
      sortable: true,
      filter: FilterType.number,
      numberPattern: 'integer',
    },
    {
      key: 'name',
      title: 'Name',
      sortable: true,
      filter: FilterType.optText,
      formatter: formatAsText,
    },
    {
      key: 'created',
      title: 'Created',
      sortable: true,
      hideable: true,
      filter: FilterType.dateRange,
      formatter: formatAsDate,
    },
    {
      key: 'updated',
      title: 'Updated',
      sortable: true,
      hideable: true,
      hidden: true,
      filter: FilterType.dateRange,
      formatter: formatAsDate,
    },
  ];

  fetchFilter(params: IFilterInfo): Observable<any> {
    return of({
      data: [
        {
          id: 123,
          name: 'Test',
          created: '2023-03-14T12:00:05',
          updated: '2023-03-15T19:19:19',
        },
      ],
      total: 123,
    });
  }
}
