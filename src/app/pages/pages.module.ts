import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLinkWithHref } from '@angular/router';
import { CoreComponentsModule } from 'neercms/core';
import { FormComponentsModule } from 'neercms/form';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './public/error/error.component';
import { LoginComponent } from './public/login/login.component';

@NgModule({
  declarations: [DashboardComponent, ErrorComponent, LoginComponent],
  imports: [
    // Angular Core
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
    // NeerCMS
    CoreComponentsModule,
    FormComponentsModule,
  ],
})
export class PagesModule {}
