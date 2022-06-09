import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubSink } from 'subsink';
import { Business, Data, Devices } from './business';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit, OnDestroy {

	// businessList: Business = {msg: '', status: '', data: []};
	businessList: Observable<Data> | any;
	page: any = 1;
	pageSize: any = 10;
	isLoading: boolean | any = true;
	errorMessage: string = "";
	subs = new SubSink();

	constructor(private apiService: ApiCallService, public loaderService: LoaderService) {
		/**
		 * @author Pranto
		 * @description Get business list from API
		 */
		//  this.loaderService.isLoading.subscribe((v) => {
		// 	console.log(v, 'v');
		// 	this.isLoading = v;
		// });
		this.subs.sink = this.apiService.getBusiness().subscribe(
		(data: Data) => {
			this.businessList = data;
			if (this.businessList.status === 200) {
				this.isLoading = false;
				this.businessList.data.forEach((element: any) => {
					element.packages.forEach((p: any) => {
						p["copy"] = "copy";
					});
				});
			} else {
				this.errorMessage = this.businessList.msg;
			}
			console.log(this.businessList);
		},
		error => {
			this.isLoading = false;
			if (error?.msg) {
				this.errorMessage = error?.msg;
			} else {
				this.errorMessage = error?.error.detail;
			}
		});
		// data => {
		// 	this.packageList = data;
		// 	this.isLoading = false;
		// 	this.packageList.data.forEach((element: any) => {
		// 		element["copy"] = "copy";
		// 	});
		// 	console.log(this.packageList);
		// },
		// error => {
		// 	let errorMessage = error.error.detail;
		// 	if (error?.status === 0) {
		// 		this.noPackageString = error?.message;
		// 	} else {
		// 		this.noPackageString = errorMessage;
		// 	}
		// }

	}



	ngOnInit(): void {

	}

	// pageIndexChange(event: any) {
	// 	this.page = event;
	// }

	// pageSizeChange(event: any) {
	// 	this.pageSize = event;
	// }

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
		this.businessList.data[index].expand = !this.businessList.data[index].expand;
		this.arrayExceptIndex(this.businessList.data, index);
		const targetElement = event.target.nextElementSibling;
		const targetElementHeight = targetElement.scrollHeight;
		if (this.businessList.data[index].expand === true) {
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
		this.subs.unsubscribe();
	}

}
