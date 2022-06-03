import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessRoutingModule } from './business-routing.module';
import { BusinessComponent } from './business.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { BusinessDetailsComponent } from './business-details/business-details.component';


@NgModule({
  declarations: [
    BusinessComponent,
    BusinessDetailsComponent
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
	SharedModule
  ]
})
export class BusinessModule { }
