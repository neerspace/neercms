import { ColumnInfo, ColumnStyle, FilterType } from 'neercms/table/types';
import { formatAsDate, formatAsText } from 'neercms/table/utilities';
import { ArticlesTableComponent } from './articles-table/articles-table.component';

export function articleColumns(context: ArticlesTableComponent): ColumnInfo[] {
  return [
    {
      actions: [
        {
          button: {
            class: 'btn-secondary neutral general-button',
            text: 'Edit',
          },
          onClick: (model: any) => {
            context.onArticleDetails(model);
          },
        },
      ],
    },
    {
      key: 'languageCode',
      title: 'Language Code',
      sortable: true,
      filter: FilterType.text,
      template: 'article_languageCode',
      style: ColumnStyle.fillSized,
    },
    {
      key: 'id',
      title: 'Id',
      sortable: true,
      filter: FilterType.number,
      numberPattern: 'integer',
    },
    {
      key: 'title',
      title: 'Title',
      sortable: true,
      filter: FilterType.optText,
      formatter: formatAsText,
    },
    {
      key: 'description',
      title: 'Description',
      sortable: true,
      hideable: true,
      filter: FilterType.optText,
      formatter: formatAsText,
    },
    {
      key: 'views',
      title: 'Views Count',
      sortable: true,
      hideable: true,
      filter: FilterType.optNumber,
      numberPattern: 'integer',
    },
    {
      key: 'rate',
      title: 'Rate',
      sortable: true,
      hideable: true,
      filter: FilterType.optNumber,
      numberPattern: 'integer',
    },
    {
      key: 'created',
      title: 'Created',
      sortable: true,
      hideable: true,
      hidden: false,
      filter: FilterType.dateRange,
      formatter: formatAsDate,
    },
  ];
}
