import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { Business, Data, Devices } from '../dashboard/business/business';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	packageUploadForm: any;
	packageStatus: any[] = [true, false];
	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	isInstalled: any[] = [true, false];
	businessList: Data[] | any;
	deviceList: any;
	packageList: any = [];
	masterSelected: any;
	newCheckList: any;
	commandList: any;
	showPackageOptions: boolean = false;
	showPackagePath: boolean = false;
	isVersion: boolean = false;
	isPin: boolean = false;
	isWallpaper: boolean = false;

	constructor(private http: HttpClient, private fb: FormBuilder, private apiService: ApiCallService) {
		/**
		 * @author Pranto
		 * @description Get business list from API
		 */
		//  this.loaderService.isLoading.subscribe((v) => {
		// 	console.log(v, 'v');
		// 	this.isLoading = v;
		// });
		this.apiService.getBusiness().subscribe((data: Business) => {
			this.businessList = data.data;
			this.businessList.forEach((element: any) => {
				element['parentChecked'] = false;
				element.device_info.forEach((e: any) => {
					e['checked'] = false;
				});
			});
			console.log(this.businessList);
		});

		this.apiService.getCommands().subscribe((data: any) => {
			this.commandList = data;
			console.log(this.commandList);
		});
	}

	ngOnInit(): void {
		this.packageUploadForm = this.fb.group({
			businessID: ['', [Validators.required]],
			device: [[], [Validators.required]],
			deviceID: [[]],
			commandType: ['', [Validators.required]],
			packageName: ['', [Validators.required]],
			packagePath: ['', [Validators.required]],
			pin: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]],
			emptyString: [null],
			wallpaper: ['', [Validators.required]],
			version: ['', [Validators.required]]
		})
	}

	allCheckUncheck(): void {
		this.deviceList[0].device_info.forEach((element: any) => {
			element.checked = this.masterSelected;
		}
		);
		this.getSelectedDevice();
	}

	individualCheck(index: any): void {
		this.masterSelected = this.deviceList[0].device_info.every((item: any) => {
			return item.checked == true;
		});

		this.getSelectedDevice();
	}

	getSelectedDevice(): void {
		this.newCheckList = [];
		this.deviceList[0].device_info.forEach((element: any) => {
			if (element.checked) {
				this.newCheckList.push(element);
			}
		});
		if (this.newCheckList.length) {
			this.packageUploadForm.patchValue({
				device: this.newCheckList.map((item: any) => {
					return item.device_name;
				})
			});
			if (this.masterSelected) {
				this.packageUploadForm.patchValue({
					deviceID: ''
				});
			} else {
				this.packageUploadForm.patchValue({
					deviceID: this.newCheckList.map((item: any) => {
						return item.device_id;
					})
				});
			}
		} else {
			this.packageUploadForm.patchValue({
				device: null,
				deviceID: null
			});
		}
		this.packageList = this.newCheckList[0]?.packages;
		console.log(this.packageList);
		console.log(this.newCheckList);
		console.log(this.packageUploadForm.value.device, this.packageUploadForm.value.deviceID);
	}

	showDevices(event: any): void {
		this.packageUploadForm.controls.device.setValue([]);
		this.deviceList = this.businessList.filter((item: any) => {
			return item.business_id === event;
		});
		console.log(this.deviceList);
	}
	showPackage(event: any): void {
		// this.packageList = this.deviceList[0].device_info.filter((item: any) => {
		// 	return item.device_name === event;
		// });
		// console.log(this.packageList, "package");
	}

	showCommand(event: any): void {
		console.log(event);
		if (event === "uninstall" || event === "remove_from_lock_app" || event === "remove_from_launcher" || event === "remove_from_both_app" || event === "add_to_lock_app" || event === "add_to_launcher" || event === "add_to_both_app") {
			this.showPackageOptions = true;
			this.isVersion = false;
			this.showPackagePath = false;
			this.isPin = false;
			this.isWallpaper = false;
			this.packageUploadForm.controls.emptyString.setValue(null);
		} else if (event === "install_app" || event === "update") {
			this.showPackagePath = true;
			this.isVersion = true;
			this.showPackageOptions = false;
			this.isPin = false;
			this.isWallpaper = false;
			this.packageUploadForm.controls.emptyString.setValue(null);
		} else if (event === "change_pin") {
			this.isPin = true;
			this.showPackagePath = false;
			this.isVersion = false;
			this.showPackageOptions = false;
			this.packageUploadForm.controls.emptyString.setValue(null);
			this.isWallpaper = false;
		} else if (event === "reboot" || event === "lock_on" || event === "lock_off") {
			this.packageUploadForm.controls.emptyString.setValue("");
			this.isWallpaper = false;
			this.showPackageOptions = false;
			this.showPackagePath = false;
			this.isVersion = false;
			this.isPin = false;
		} else if (event === "change_wallpaper") {
			this.isWallpaper = true;
			this.showPackageOptions = false;
			this.showPackagePath = false;
			this.isVersion = false;
			this.isPin = false;
			this.packageUploadForm.controls.emptyString.setValue(null);
		} else {
			this.showPackageOptions = false;
			this.showPackagePath = false;
			this.isVersion = false;
			this.isPin = false;
			this.packageUploadForm.controls.emptyString.setValue(null);
			this.isWallpaper = false;
		}
	}

	showPackagePathF(event: any): void {
		// this.packageUploadForm.controls.packagePath.setValue(event);
		console.log(this.packageUploadForm.controls.packagePath, "form");
		// this.packageUploadForm.controls.packagePath.setValue(value);
	}

	handleSubmit(): void {
		console.log(this.packageUploadForm.value);
		// reset form
		this.packageUploadForm.reset();
		this.masterSelected = false;
		this.newCheckList = [];
		this.deviceList[0]?.device_info.forEach((element: any) => {
			element.checked = false;
		}
		);
	}

}
