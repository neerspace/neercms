import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { TabsComponent } from 'neercms/core';
import { SplitBaseComponent } from 'neercms/split';
import { DataTableComponent } from 'neercms/table';
import { ColumnInfo, IFiltered, IFilterInfo } from 'neercms/table/types';
import { Observable } from 'rxjs';
import { articleColumns } from '../article-columns';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-articles-table',
  templateUrl: './articles-table.component.html',
  styleUrls: ['./articles-table.component.scss'],
  providers: [ArticleService],
})
export class ArticlesTableComponent extends SplitBaseComponent<any> implements OnInit {
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;
  @ViewChild('table') table!: DataTableComponent<any>;
  @ViewChild('articleForm') articleTemplate!: TemplateRef<any>;
  @ViewChild('localizationForm') localizationTemplate!: TemplateRef<any>;
  @ViewChild('localizationsColumn') localizationsColumnTemplate!: TemplateRef<any>;

  columns: ColumnInfo[];
  hideTable = false;
  showFilters: boolean = false;

  constructor(public readonly articleService: ArticleService) {
    super('articles');
    this.columns = articleColumns(this);
  }

  ngOnInit(): void {}

  fetchFilter(params: IFilterInfo): Observable<IFiltered<any>> {
    return this.articleService.filter(params);
  }

  onArticleDetails(model: any) {
    const tabTitle = `${model.articleSetId} | ${model.languageCode.toUpperCase()}`;
    this.tabsComponent.openTab(
      this.getArticleId(model),
      tabTitle,
      this.localizationTemplate,
      model,
    );
  }

  getArticleId(model: any): string {
    return model.articleSetId + '_' + model.id;
  }
}
