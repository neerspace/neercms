import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponentsModule } from 'neercms/core';
import { FormComponentsModule } from 'neercms/form';
import { LayoutComponentsModule } from 'neercms/layout';
import { SplitComponentsModule } from 'neercms/split';
import { TableComponentsModule } from 'neercms/table';
import { TabComponentsModule } from 'neercms/tabs';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticlesTableComponent } from './articles-table/articles-table.component';

const routes: Routes = [{ path: '', component: ArticlesTableComponent }];

@NgModule({
  declarations: [ArticleFormComponent, ArticlesTableComponent],
  imports: [
    // Angular Core
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    // NeerCMS
    CoreComponentsModule,
    FormComponentsModule,
    LayoutComponentsModule,
    TableComponentsModule,
    TabComponentsModule,
    SplitComponentsModule,
  ],
  exports: [ArticleFormComponent],
})
export class ArticlesModule {}
