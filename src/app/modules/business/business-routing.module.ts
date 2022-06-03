import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailsComponent } from './business-details/business-details.component';
import { BusinessComponent } from './business.component';

const routes: Routes = [
	{
		path: '', component: BusinessComponent,
	},
	{ path: 'business-details/:id', component: BusinessDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
