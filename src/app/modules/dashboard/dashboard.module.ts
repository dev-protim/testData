import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PackagesComponent } from './packages/packages.component';


@NgModule({
	declarations: [
		DashboardComponent,
		PackagesComponent,
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule
	]
})
export class DashboardModule { }
