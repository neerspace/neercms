import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { CoreComponentsModule } from 'neercms/core';
import { FormComponentsModule } from 'neercms/form';
import { LayoutComponentsModule } from 'neercms/layout';
import { TableComponentsModule } from 'neercms/table';
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
    // Libs
    AngularSplitModule,
    // NeerCMS
    CoreComponentsModule,
    FormComponentsModule,
    LayoutComponentsModule,
    TableComponentsModule,
  ],
  exports: [ArticleFormComponent],
})
export class ArticlesModule {}
