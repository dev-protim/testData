import { Component, OnInit, OnDestroy, Input, DoCheck } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy, DoCheck {

	subs = new SubSink();
	groupList: any;
	responseMessage: string = "";
	isLoading: boolean = true;
	@Input() newGroup: any;

	constructor(private apiService: ApiCallService) {
		this.subs.sink = this.apiService.getGroups().subscribe(
			(data: any) => {
				console.log(data);
				this.isLoading = false;
				if (data.statusCode === 200) {
					this.groupList = data.data;
				} else {
					this.responseMessage = data.msg;
				}
			}, (error: any) => {
				this.isLoading = false;
			}
		)
	}

	ngOnInit(): void {
	}

	ngDoCheck(): void {
		if (this.newGroup) {
			this.groupList.push({
				name: this.newGroup.name,
				devices: this.newGroup.devices
			});
			console.log(this.groupList);
			this.newGroup = null;
		}
		// this.groupList.push(this.newGroup);
		// console.log(this.newGroup, "new group");
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
