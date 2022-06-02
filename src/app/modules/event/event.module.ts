import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { EventFormComponent } from './event-form/event-form.component';
import { EventHistoryComponent } from './event-history/event-history.component';


@NgModule({
  declarations: [
    EventComponent,
 	EventFormComponent,
  EventHistoryComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
	SharedModule
  ]
})
export class EventModule { }
