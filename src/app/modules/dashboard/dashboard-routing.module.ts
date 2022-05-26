import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
	{ path: '', component: DashboardComponent },
	{ path: 'business-details/:id', component: BusinessDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
