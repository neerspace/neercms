import { Component, ViewChild } from '@angular/core';
import { ModalsService } from 'neercms/services/viewport';
import { DataTableComponent } from 'neercms/table';
import { ColumnInfo, IFiltered, IFilterInfo } from 'neercms/table/types';
import { TabsComponent } from 'neercms/tabs';
import { Observable, tap } from 'rxjs';
import { articleColumns } from '../article-columns';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss'],
  providers: [ArticleService],
})
export class ArticlesTableComponent {
  @ViewChild(TabsComponent) tabs!: TabsComponent;
  @ViewChild('table') table: DataTableComponent<any> = { loading: true } as any;

  columns: ColumnInfo[];
  hideTable = false;
  showFilters: boolean = false;

  constructor(
    public readonly articleService: ArticleService,
    public readonly modals: ModalsService,
  ) {
    this.columns = articleColumns(this);
  }

  fetchFilter(params: IFilterInfo): Observable<IFiltered<any>> {
    return this.articleService.filter(params).pipe(
      tap(res => {
        setTimeout(() => {
          this.onArticleDetails(res.data![0]);
          this.onArticleDetails(res.data![1]);
          this.onArticleDetails(res.data![2]);
        }, 100);
      }),
    );
  }

  onArticleDetails(model: any) {
    const tabTitle = `${model.articleSetId} | ${model.languageCode.toUpperCase()}`;
    this.tabs.openTab(this.getArticleId(model), tabTitle, 'article', model);
  }

  getArticleId(model: any): string {
    return model.articleSetId + '_' + model.id;
  }
}
