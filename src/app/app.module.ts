import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormModule } from '../../libs/neercms/form/form.module';
import { NeercmsModule } from '../../libs/neercms/src/lib/neercms.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NeercmsModule,
    FormModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
