import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { CoreComponentsModule } from '../core/core-components.module';
import { FormComponentsModule } from '../form/form-components.module';
import { ColumnChooserComponent } from './column-chooser/column-chooser.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TableFilterFieldComponent } from './filter-field/table-filter-field.component';
import { TablePageSizeComponent } from './page-size-select/table-page-size.component';
import { TablePaginationComponent } from './pagination/table-pagination.component';
import { CustomColumnDirective } from './custom-column.directive';

@NgModule({
  declarations: [
    DataTableComponent,
    TablePaginationComponent,
    TablePageSizeComponent,
    TableFilterFieldComponent,
    ColumnChooserComponent,
    CustomColumnDirective,
  ],
  exports: [DataTableComponent, CustomColumnDirective],
  imports: [
    CommonModule,
    FormComponentsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    CoreComponentsModule,
  ],
})
export class TableComponentsModule {}
