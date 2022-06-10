import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';
import { Devices } from '../../business/business';
import { GroupListComponent } from '../group-list/group-list.component';

@Component({
	selector: 'app-create-group',
	templateUrl: './create-group.component.html',
	styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, OnDestroy {

	@ViewChild(GroupListComponent) groupListComponent: any;

	isGroupModalMobile: boolean = false;
	createGroupForm: any;
	subs = new SubSink();
	devices: Devices[] = [];
	deviceResponse: string = "waiting";
	deviceResponseMessage: string = "Loading...";
	createdGroup: any;
	dumyDevices: any = [
		{
			"created_at": "2022-06-09 13:37:02.857992",
			"device_id": "869816051682440",
			"device_mode": "landscape",
			"device_name": "CTD-RK3288-8843",
			"device_size": "1366x720",
			"device_type": "tablet",
			"is_connected": true,
			"packages": [{
				"apk_path": "https://python.uiiapi.co.uk/launcher-assets/yo-launcher-apk/ed4a290a12cf4c65855c6586d05e3d3c.apk",
				"created_at": "2022-03-30",
				"is_installed": true,
				"package_id": "ed4a290a12cf4c65855c6586d05e3d3c",
				"package_name": "com.epos.valt.app",
				"status": true,
				"type": "both"
			}]
		},
		{
			"created_at": "2022-06-09 13:37:02.857992",
			"device_id": "869816051682441",
			"device_mode": "landscape",
			"device_name": "CTD-RK3288-8843",
			"device_size": "1366x720",
			"device_type": "tablet",
			"is_connected": true,
			"packages": [{
				"apk_path": "https://python.uiiapi.co.uk/launcher-assets/yo-launcher-apk/ed4a290a12cf4c65855c6586d05e3d3c.apk",
				"created_at": "2022-03-30",
				"is_installed": true,
				"package_id": "ed4a290a12cf4c65855c6586d05e3d3c",
				"package_name": "com.epos.valt.app",
				"status": true,
				"type": "both"
			}]
		},
		{
			"created_at": "2022-06-09 13:37:02.857992",
			"device_id": "869816051682442",
			"device_mode": "landscape",
			"device_name": "CTD-RK3288-8843",
			"device_size": "1366x720",
			"device_type": "tablet",
			"is_connected": true,
			"packages": [{
				"apk_path": "https://python.uiiapi.co.uk/launcher-assets/yo-launcher-apk/ed4a290a12cf4c65855c6586d05e3d3c.apk",
				"created_at": "2022-03-30",
				"is_installed": true,
				"package_id": "ed4a290a12cf4c65855c6586d05e3d3c",
				"package_name": "com.epos.valt.app",
				"status": true,
				"type": "both"
			}]
		},
		{
			"created_at": "2022-06-09 13:37:02.857992",
			"device_id": "869816051682443",
			"device_mode": "landscape",
			"device_name": "CTD-RK3288-8843",
			"device_size": "1366x720",
			"device_type": "tablet",
			"is_connected": true,
			"packages": [{
				"apk_path": "https://python.uiiapi.co.uk/launcher-assets/yo-launcher-apk/ed4a290a12cf4c65855c6586d05e3d3c.apk",
				"created_at": "2022-03-30",
				"is_installed": true,
				"package_id": "ed4a290a12cf4c65855c6586d05e3d3c",
				"package_name": "com.epos.valt.app",
				"status": true,
				"type": "both"
			}]
		}
	]
	@Output() emitter:EventEmitter<any> = new EventEmitter<any>();

	constructor(private fb: FormBuilder, private apiService: ApiCallService, private modalController: ModalControllerService) {
		// Get all devices
		this.subs.sink = this.apiService.getBusiness().subscribe(
			data => {
				if (data.statusCode === 200) {
					console.log(data);
					this.devices = data.data;
				} else {
					this.deviceResponseMessage = data.msg;
					this.deviceResponse = "error";
				}
			}, error => {
				console.log(error);
				this.deviceResponse = "error";
				this.deviceResponseMessage = error?.error.detail;
			}
		)
	}

	ngOnInit(): void {
		this.createGroupForm = this.fb.group({
			name: ['', [Validators.required]],
			devices: [[], [Validators.required]]
		})
	}

	/**
	 * @author Pranto
	 * @description Create group, close event form side-modal in mobile
	 */

	showDevices(event: any): void {
		console.log(event);
	}

	// Create group
	handleSubmit(): void {
		const data = {
			name: this.createGroupForm.value.name,
			devices: this.createGroupForm.value.devices
		}

		this.modalController.changeResponseStatus("waiting")
		this.modalController.changeResponseMessage("Please wait...")

		console.log(data);
		this.apiService.createGroup(data).subscribe(
			(data: any) => {
				if (data?.statusCode === 201) {
					this.modalController.changeResponseStatus("success")
					this.modalController.changeResponseMessage(data?.msg);
					this.createdGroup = data.data;
					// con
					// this.groupListComponent.groupList.push(this.createdGroup);
					// console.log(this.groupListComponent.groupList);
					this.emitter.emit(this.createdGroup);
				} else {
					this.modalController.changeResponseStatus("failed")
					this.modalController.changeResponseMessage(data?.msg)
				}
				console.log(data);
			}, error => {
				this.modalController.changeResponseStatus("failed")
				this.modalController.changeResponseMessage(error?.error.detail)
			})
		this.modalController.showAlertModal();
	}

	// closeSubmissionModal(): void {
	// 	this.isDeviceSubmitted = false;
	// }

	// Close event form side-modal in mobile
	closeEventModalMobile(): void {
		this.isGroupModalMobile = false;
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
