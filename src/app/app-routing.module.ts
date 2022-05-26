import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard-view/dashboard-view.module').then(m => m.DashboardViewModule) },
//   { path: 'event', loadChildren: () => import('./modules/event/event.module').then(m => m.EventModule) },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
	scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
