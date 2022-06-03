import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';

@Component({
	selector: 'app-event-history',
	templateUrl: './event-history.component.html',
	styleUrls: ['./event-history.component.scss']
})
export class EventHistoryComponent implements OnInit, OnDestroy {

	eventHistoryList: any[] = [
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-05-12"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-07-10"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-03-15"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-05-17"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-02-11"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-07-10"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-05-12"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-07-10"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-03-15"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-05-17"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "failed",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-02-11"
		// },
		// {
		// 	socket_history: "836cb2cd94cc445792cdcf96d96d93b6441",
		// 	ref_device_id: "4445461531531",
		// 	ref_business_id: "4864653412",
		// 	status: "success",
		// 	message: "lock on success",
		// 	command_value: "lock_on",
		// 	created_at: "2022-07-10"
		// },
	];

	statusList: any[] = ["success", "failed", "date"];
	selectedStatus: any;
	orderByDate: boolean = true;
	page: any = 1;
	pageSize: any = 8;

	url: string = "https://python.uiiapi.co.uk/launcher/admin/events-history";
	isLoading: boolean | any = true;

	// {
	// 	"start_date": "",
	// 	"end_date": "",
	// 	"status": "",
	// 	"page_number": 0
	// }

	constructor(private http: HttpClient, private apiService: ApiCallService) { }

	ngOnInit(): void {
		this.http.post(this.url, {
			"start_date": "",
			"end_date": "",
			"status": "",
			"page_number": 0
		}).toPromise().then((data: any) => {
			console.log(data, "data from api");
			this.eventHistoryList = data.data;
			this.eventHistoryList.forEach(element => {
				element.created_time = element.created_time.split(" ")[0];
			})
			this.isLoading = false;
		})
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
		var dateA = new Date(a.created_time).getTime();
		var dateB = new Date(b.created_time).getTime();
		return dateA > dateB ? -1 : 1;
	}

	/**
	 * @author Pranto
	 * @description pagination
	 */
	pageIndexChange(event: any) {
		this.page = event;
	}

	pageSizeChange(event: any) {
		this.pageSize = event;
	}

	ngOnDestroy(): void {
		this.eventHistoryList = [];
	}

}
