import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardViewRoutingModule } from './dashboard-view-routing.module';
import { DashboardViewComponent } from './dashboard-view.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';


@NgModule({
  declarations: [
    DashboardViewComponent,
    SideNavComponent,
    DashboardHeaderComponent
  ],
  imports: [
    CommonModule,
    DashboardViewRoutingModule
  ]
})
export class DashboardViewModule { }
