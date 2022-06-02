import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { WebSocketService } from 'src/app/services/web-socket/web-socket.service';
import { Business, Data } from '../dashboard/business/business';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

	@ViewChild(EventFormComponent) eventFormComponent: any;

	// packageUploadForm: any;
	// packageStatus: any[] = [true, false];
	// packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	// isInstalled: any[] = [true, false];
	// businessList: Data[] | any;
	// deviceList: any;
	// packageList: any = [];
	// masterSelected: any;
	// newCheckList: any;
	// commandList: any;
	// showPackageOptions: boolean = false;
	// showPackagePath: boolean = false;
	// isVersion: boolean = false;
	// // isPin: boolean = false;
	// // isWallpaper: boolean = false;
	// commandEvent: any;
	// // packagePath: any;
	// // versionControlTest: any;
	// message: any;
	// connection: any;
	// isEventModalMobile: boolean = false;

	constructor(private fb: FormBuilder, private apiService: ApiCallService, private webSocket: WebSocketService) {
		/**
		 * @author Pranto
		 * @description Get business list from API
		 */
		//  this.loaderService.isLoading.subscribe((v) => {
		// 	console.log(v, 'v');
		// 	this.isLoading = v;
		// });
		// this.apiService.getBusiness().subscribe((data: Business) => {
		// 	this.businessList = data.data;
		// 	this.businessList.forEach((element: any) => {
		// 		element['parentChecked'] = false;
		// 		element.device_info.forEach((e: any) => {
		// 			e['checked'] = false;
		// 		});
		// 	});
		// 	console.log(this.businessList);
		// });

		// this.apiService.getCommands().subscribe((data: any) => {
		// 	this.commandList = data;
		// 	console.log(this.commandList);
		// });
	}

	ngOnInit(): void {
		// this.packageUploadForm = this.fb.group({
		// 	business_id: ['', [Validators.required]],
		// 	// device: ['', [Validators.required]],
		// 	device_id: [''],
		// 	command: ['', [Validators.required]]
		// })

		// this.webSocket.connect();
	}

	// allCheckUncheck(): void {
	// 	this.deviceList[0].device_info.forEach((element: any) => {
	// 		element.checked = this.masterSelected;
	// 	}
	// 	);
	// 	this.getSelectedDevice();
	// }

	// individualCheck(index: any): void {
	// 	this.masterSelected = this.deviceList[0].device_info.every((item: any) => {
	// 		return item.checked == true;
	// 	});
	// 	this.getSelectedDevice();
	// }

	// getSelectedDevice(): void {
	// 	this.newCheckList = [];
	// 	this.deviceList[0].device_info.forEach((element: any) => {
	// 		if (element.checked) {
	// 			this.newCheckList.push(element);
	// 		}
	// 	});
	// 	if (this.newCheckList.length) {
	// 		this.packageUploadForm.patchValue({
	// 			device: this.newCheckList.map((item: any) => {
	// 				return item.device_name;
	// 			})
	// 		});
	// 		if (this.masterSelected) {
	// 			this.packageUploadForm.patchValue({
	// 				device_id: ''
	// 			});
	// 		} else {
	// 			this.packageUploadForm.patchValue({
	// 				device_id: this.newCheckList.map((item: any) => {
	// 					return item.device_id;
	// 				})
	// 			});
	// 		}
	// 	} else {
	// 		this.packageUploadForm.patchValue({
	// 			device: null,
	// 			device_id: null
	// 		});
	// 	}
	// 	this.packageList = this.newCheckList[0]?.packages;
	// 	console.log(this.packageList);
	// 	console.log(this.newCheckList);
	// 	console.log(this.packageUploadForm.value.device, this.packageUploadForm.value.deviceID);
	// }

	// showDevices(event: any): void {
	// 	// this.packageUploadForm.controls.device.setValue([]);
	// 	if (event !== null) {
	// 		this.deviceList = this.businessList.filter((item: any) => {
	// 			return item.business_id === event;
	// 		});
	// 		console.log(this.deviceList);
	// 	}
	// }

	// showPackages(event: any): void {
	// 	// Get all packages if device_id mached with event
	// 	if (event !== null) {
	// 		this.packageList = this.deviceList[0].device_info.filter((item: any) => {
	// 			return item.device_id === event;
	// 		})[0].packages;
	// 	}
	// 	console.log(this.packageList, "package lists");
	// }

	// showCommand(event: any): void {
	// 	this.commandEvent = event;
	// 	if (this.commandEvent === 'change_pin') {
	// 		this.packageUploadForm.removeControl('value', this.fb.control('', [Validators.required]));
	// 		this.packageUploadForm.addControl('value', this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]));
	// 	} else {
	// 		this.packageUploadForm.removeControl('value', this.fb.control('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9]*')]));
	// 		this.packageUploadForm.addControl('value', this.fb.control('', [Validators.required]));
	// 	}
	// 	if (this.commandEvent === 'reboot' || this.commandEvent === 'lock_on' || this.commandEvent === 'lock_off') {
	// 		this.packageUploadForm.controls['value'].setValidators(null);
	// 		// this.packageUploadForm.addControl('value', this.fb.control('', [Validators.required]));
	// 		// this.packageUploadForm.patchValue({
	// 		// 	value: ''
	// 		// })
	// 	}
	// 	if (this.commandEvent !== 'install_app' || this.commandEvent !== 'update') {
	// 		this.isVersion = false;
	// 		this.packageUploadForm.removeControl('version_id', this.fb.control('', Validators.required));
	// 	}
	// }

	// handlePackagePath(event: any): void {
	// 	let packageName;
	// 	if (event !== null) {
	// 		// this.packagePath = event?.apk_path;
	// 		packageName = event?.package_name;
	// 		if (packageName === 'com.epos.valt.app') {
	// 			this.isVersion = true;
	// 			this.packageUploadForm.addControl('version_id', this.fb.control('', Validators.required));
	// 		} else {
	// 			this.isVersion = false;
	// 			this.packageUploadForm.removeControl('version_id', this.fb.control('', Validators.required));
	// 		}
	// 	}
	// }

	// handleSubmit(): void {
	// 	// console.log(this.packagePath, "package path");
	// 	let formObject = this.packageUploadForm.value;
	// 	if (formObject.command === 'install_app' || formObject.command === 'update') {
	// 		formObject.value = formObject.value.apk_path;
	// 	}
	// 	console.log(formObject, "object");

	// 	// this.webSocket.sendMessage(this.packageUploadForm.value).subscribe(
	// 	// 	(data: any) => {
	// 	// 		console.log(data, "from component");
	// 	// 		this.message = data.status;
	// 	// 	}
	// 	// );
	// 	// this.webSocket.sendMessage(formObject);
	// 	// this.connection = this.webSocket.getMessage().subscribe(message => {
	// 	// 	this.message = message;
	// 	// 	console.log(this.message, message);
	// 	// })
	// 	this.deviceList = [];
	// 	this.isVersion = false;
	// 	this.packageUploadForm.reset();
	// 	this.masterSelected = false;
	// 	// this.businessList.forEach((element: any) => {
	// 	// 	element.device_info.forEach((item: any) => {
	// 	// 		item.checked = false;
	// 	// 	}
	// 	// 	);
	// 	// }
	// 	// );
	// 	this.newCheckList = [];
	// }

	// closeSubmissionStatusModal(): void {
	// 	this.isEventSent = false;
	// }

	// Open event form in mobile
	openEventForm(): void {
		// this.isEventModalMobile = true;
		this.eventFormComponent.isEventModalMobile = true;
	}

	// ngOnDestroy(): void {
	// 	// this.connection.unsubscribe();
	// }

}
