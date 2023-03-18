import { Routes } from '@angular/router';
import { buildTitle } from 'neercms/shared/utilities';
import { AdminLayoutComponent } from './core/layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ErrorComponent } from './pages/public/error/error.component';
import { LoginComponent } from './pages/public/login/login.component';

const adminRouters: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, title: buildTitle('Dashboard') },
  {
    path: 'articles',
    loadChildren: () => import('./pages/app/articles/articles.module').then(m => m.ArticlesModule),
    title: buildTitle('Articles'),
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/manage/profile/profile.module').then(m => m.ProfileModule),
    title: buildTitle('Profile'),
  },
];

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    // canActivate: [AuthorizedGuard],
    // canActivateChild: [EnsurePermissionsGuard],
    children: adminRouters,
  },

  { path: 'login', component: LoginComponent, title: buildTitle('Login') },
  { path: 'error/:code', component: ErrorComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];
