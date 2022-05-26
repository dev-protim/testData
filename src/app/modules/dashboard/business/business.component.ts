import { Component, OnInit } from '@angular/core';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Business } from './business';

@Component({
	selector: 'app-business',
	templateUrl: './business.component.html',
	styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {

	businessList: Business = {msg: '', status: '', data: []};
	page: any = 1;
	pageSize: any = 10;
	isLoading: boolean | any = true;

	constructor(private apiService: ApiCallService, public loaderService: LoaderService) {
		/**
		 * @author Pranto
		 * @description Get business list from API
		 */
		//  this.loaderService.isLoading.subscribe((v) => {
		// 	console.log(v, 'v');
		// 	this.isLoading = v;
		// });
		this.apiService.getBusiness().subscribe((data: Business) => {
			this.businessList = data;
			this.isLoading = false;
			console.log(this.businessList);
		});


	}



	ngOnInit(): void {

	}

	pageIndexChange(event: any) {
		this.page = event;
	}

	pageSizeChange(event: any) {
		this.pageSize = event;
	}

}
