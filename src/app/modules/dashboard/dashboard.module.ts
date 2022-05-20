import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HistoryComponent } from './history/history.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PackagesComponent } from './packages/packages.component';


@NgModule({
	declarations: [
		DashboardComponent,
		HistoryComponent,
		PackagesComponent
	],
	imports: [
		CommonModule,
		DashboardRoutingModule,
		SharedModule
	]
})
export class DashboardModule { }
