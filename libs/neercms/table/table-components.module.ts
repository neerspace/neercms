import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreComponentsModule } from 'neercms/core';
import { FormComponentsModule } from 'neercms/form';
import { NgxMaskModule } from 'ngx-mask';
import { ColumnChooserComponent } from './column-chooser/column-chooser.component';
import { ColumnTemplateDirective } from './column-template.directive';
import { DataTableComponent } from './data-table/data-table.component';
import { TableFilterFieldComponent } from './filter-field/table-filter-field.component';
import { TablePageSizeComponent } from './page-size-select/table-page-size.component';
import { TablePaginationComponent } from './pagination/table-pagination.component';

@NgModule({
  declarations: [
    DataTableComponent,
    TablePaginationComponent,
    TablePageSizeComponent,
    TableFilterFieldComponent,
    ColumnChooserComponent,
    ColumnTemplateDirective,
  ],
  exports: [DataTableComponent, ColumnTemplateDirective],
  imports: [
    CommonModule,
    CoreComponentsModule,
    FormComponentsModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
})
export class TableComponentsModule {}
