import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardViewComponent } from './dashboard-view.component';

const routes: Routes = [{ path: '', component: DashboardViewComponent, children: [
	{ path: 'home', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule) },
	{ path: 'business', loadChildren: () => import('../business/business.module').then(m => m.BusinessModule) },
	{ path: 'group', loadChildren: () => import('../group/group.module').then(m => m.GroupModule) },
	{ path: 'event', loadChildren: () => import('../event/event.module').then(m => m.EventModule) },
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardViewRoutingModule { }
