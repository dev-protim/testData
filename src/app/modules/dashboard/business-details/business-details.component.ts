import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter, Observable, Subject } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Business, Devices } from '../business/business';

@Component({
	selector: 'app-business-details',
	templateUrl: './business-details.component.html',
	styleUrls: ['./business-details.component.scss']
})
export class BusinessDetailsComponent implements OnInit {

	// projectData: Observable<Project> | any;
	businessList: Observable<Devices> | any;
	routerEvent: any;
	deviceId: any;
	isLoading: boolean | any = true;
	selectedIndex: any;

	constructor( private router: Router,
		private activateRouter: ActivatedRoute,
		private apiService: ApiCallService,
		public loaderService: LoaderService ) {
			// this.loaderService.isLoading.subscribe((v) => {
			// 	console.log(v, 'v');
			// 	this.isLoading = v;
			// });

			this.routerEvent = this.router.events
			.pipe(filter((event: RouterEvent | any) => event instanceof NavigationEnd))
			.subscribe((ev) => {
				let segment = this.router.url;
				this.deviceId = segment.split('/')[4];
				this.loadDeviceDetails(this.deviceId);
				console.log(this.deviceId);
				// setTimeout(() => {
				// }, 5000);
			})

			// this.isLoading = this.loaderService.isLoading;
		}

	ngOnInit(): void {

		// console.log(this.isLoading);
	}

	/**
	 * @author Pranto
	 * @description Get details of devices
	*/
	loadDeviceDetails(id: any): void {
		this.apiService.getDeviceDetails(id).subscribe(device => {
			this.isLoading = false;
			this.businessList = device;
			this.businessList.device_info.forEach((element: any) => {
				element['expand'] = false;
				element.packages.forEach((p: any) => {
					p["copy"] = "copy";
				});
			});
			console.log(this.businessList);
		})
	}

	/**
	 * @author Pranto
	 * @description Copy package path to clipboard
	*/
	copyInput(packagePath: any, index: any) {
		index.copy = "copied";
		const content = packagePath.textContent;
		navigator['clipboard'].writeText(content).then().catch(e => console.error(e));
		setTimeout(() => {
			index.copy = "copy";
		}, 2000);
	}

	togglePackageTable(index: number, event: any): void {
		let packageTable: any = document.querySelectorAll('.device-item__products');
		packageTable.forEach((element: any) => {
			element.style.height = '0';
		});
		this.businessList.device_info[index].expand = !this.businessList.device_info[index].expand;
		this.arrayExceptIndex(this.businessList.device_info, index);
		const targetElement = event.target.nextElementSibling;
		const targetElementHeight = targetElement.scrollHeight;
		if (this.businessList.device_info[index].expand === true) {
			targetElement.style.height = targetElementHeight + 'px';
		} else {
			targetElement.style.height = 0;
		}
	}
	arrayExceptIndex = (array: any, i: any) => {
		let notIndexArray = [];
		let beforeIndex = array.slice(0, i);
		let afterIndex = array.slice(i+1,);
		notIndexArray = [...beforeIndex, ...afterIndex];
		notIndexArray.forEach((element: any) => {
			element.expand = false;
		});
		return notIndexArray;
	}

	ngOnDestroy(): void {
		this.routerEvent.unsubscribe();
	}

}
