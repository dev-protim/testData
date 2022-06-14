import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateGroupComponent } from './create-group/create-group.component';

@Component({
	selector: 'app-group',
	templateUrl: './group.component.html',
	styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

	@ViewChild(CreateGroupComponent) createGroupComponent: any;
	newGroup: any;

	constructor() { }

	ngOnInit(): void {
	}

	// Open event form in mobile
	openEventForm(): void {
		this.createGroupComponent.isGroupModalMobile = true;
	}

	createNewGroup(newGroup: any){
		this.newGroup = newGroup;
		console.log(newGroup);
	}

}
