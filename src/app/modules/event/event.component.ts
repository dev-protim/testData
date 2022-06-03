import { Component, OnInit, ViewChild } from '@angular/core';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	@ViewChild(EventFormComponent) eventFormComponent: any;

	constructor() {
	}

	ngOnInit(): void {
	}

	// Open event form in mobile
	openEventForm(): void {
		this.eventFormComponent.isEventModalMobile = true;
	}

}
