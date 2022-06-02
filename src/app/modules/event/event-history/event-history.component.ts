import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-event-history',
	templateUrl: './event-history.component.html',
	styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent implements OnInit {

	eventHistoryList: any[] = [
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "failed",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-05-12"
		},
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "success",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-07-10"
		},
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "failed",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-03-15"
		},
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "success",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-05-17"
		},
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "failed",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-02-11"
		},
		{
			socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
			ref_device_id: "4445461531531",
			ref_business_id: "4864653412",
			status: "success",
			message: "lock on success",
			command_value: "lock_on",
			created_at: "2022-07-10"
		},
	];

	statusList: any[] = ["success", "failed", "date"];
	selectedStatus: any;
	orderByDate: boolean = true;

	constructor() { }

	ngOnInit(): void {
	}

	sortByStatus(event: any): void {
		console.log(event);
		if (event === "success") {
			this.eventHistoryList.sort(this.sortBySuccess);
		} else if (event === "failed") {
			this.eventHistoryList.sort(this.sortByFailure);
		} else if (event === "date") {
			this.eventHistoryList.sort(this.sortByDate);
		}
	}

	sortBySuccess(a: any, b: any) {
		if (a.status > b.status) {
			return -1;
		}
		if (a.status < b.status) {
			return 1;
		}
		return 0;
	}
	sortByFailure(a: any, b: any) {
		if (a.status < b.status) {
			return -1;
		}
		if (a.status > b.status) {
			return 1;
		}
		return 0;
	}
	sortByDate(a: any, b: any) {
		var dateA = new Date(a.created_at).getTime();
		var dateB = new Date(b.created_at).getTime();
		return dateA > dateB ? -1 : 1;
	}

}
