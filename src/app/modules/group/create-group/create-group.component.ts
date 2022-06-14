import { Component, OnInit, OnDestroy, ViewChild, EventEmitter, Output } from '@angular/core';
import { Form, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';
import { Devices } from '../../business/business';
// import { GroupListComponent } from '../group-list/group-list.component';

@Component({
	selector: 'app-create-group',
	templateUrl: './create-group.component.html',
	styleUrls: ['./create-group.component.scss']
})
export class CreateGroupComponent implements OnInit, OnDestroy {

	// @ViewChild(GroupListComponent) groupListComponent: any;

	isGroupModalMobile: boolean = false;
	createGroupForm: any;
	subs = new SubSink();
	devices: Devices[] = [];
	deviceResponse: string = "waiting";
	deviceResponseMessage: string = "Loading...";
	createdGroup: any;
	@Output() createGroupEmitter:EventEmitter<any> = new EventEmitter<any>(); // To pass the created group to the group list component

	constructor(private fb: FormBuilder,
		private apiService: ApiCallService,
		private modalController: ModalControllerService) {
		// Get all devices
		this.subs.sink = this.apiService.getBusiness().subscribe(
			data => {
				if (data.statusCode === 200) {
					console.log(data);
					this.devices = data.data.filtered_data;
				} else {
					this.deviceResponseMessage = data.msg;
					this.deviceResponse = "error";
				}
			}, error => {
				console.log(error);
				this.deviceResponse = "error";
				this.deviceResponseMessage = error?.error.msg;
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
			group_name: this.createGroupForm.value.name,
			devices: this.createGroupForm.value.devices
		}

		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");

		this.apiService.createGroup(data).subscribe(
			(response: any) => {
				if (response?.statusCode === 201) {
					this.createGroupForm.reset();
					this.modalController.changeResponseStatus("success")
					this.modalController.changeResponseMessage(response?.msg);
					this.createdGroup = response.data;
					this.createGroupEmitter.emit(this.createdGroup);
				} else {
					this.modalController.changeResponseStatus("failed")
					this.modalController.changeResponseMessage(response?.msg)
				}
			}, error => {
				this.modalController.changeResponseStatus("failed")
				this.modalController.changeResponseMessage(error?.error.msg)
			})
		this.modalController.showAlertModal();
	}

	// Close event form side-modal in mobile
	closeEventModalMobile(): void {
		this.isGroupModalMobile = false;
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
