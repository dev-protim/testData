import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view.component';

const routes: Routes = [{ path: '', component: DashboardViewComponent, children: [
	{ path: 'home', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardViewRoutingModule { }
