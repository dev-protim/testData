import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './group.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    GroupComponent,
    CreateGroupComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
	SharedModule
  ]
})
export class GroupModule { }
