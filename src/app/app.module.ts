import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoreComponentsModule } from 'neercms/core';
import { LayoutComponentsModule } from 'neercms/layout';
import { TableComponentsModule } from '../../libs/neercms/table/table-components.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestTableComponent } from './test-table/test-table.component';

@NgModule({
  declarations: [AppComponent, TestTableComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableComponentsModule,
    CoreComponentsModule,
    LayoutComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
