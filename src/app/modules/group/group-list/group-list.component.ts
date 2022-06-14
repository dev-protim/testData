import { Component, OnInit, OnDestroy, Input, DoCheck } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';
import { Devices } from '../../business/business';
import { Group } from './group';

@Component({
	selector: 'app-group-list',
	templateUrl: './group-list.component.html',
	styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy, DoCheck {

	subs = new SubSink();
	groupList: Group[] = [];
	devices: Devices[] = [];
	responseMessage: string = "";
	isLoading: boolean = true;
	isUpdateModal: boolean = false;
	groupUpdateForm: any;
	updateGroupInfo: any;
	deviceResponse: string = "waiting";
	deviceResponseMessage: string = "Loading...";
	@Input() newGroup: any;

	constructor(private apiService: ApiCallService,
		private modalController: ModalControllerService,
		private fb: FormBuilder) {

	}

	/**
	 * @author Pranto
	 * @description Get group list, device list, add group list after creating group
	 * @description Delete group, update group, Toggle device table
	*/

	ngOnInit(): void {
		// get groups, get devices
		this.subs.add(
			this.apiService.getGroups().subscribe(
				(data: any) => {
					console.log(data);
					this.isLoading = false;
					if (data.statusCode === 200) {
						this.groupList = data.data.groups;
						this.groupList.forEach((p: any) => {
							p["expand"] = false;
						});
					} else {
						this.responseMessage = data.msg;
					}
				}, (error: any) => {
					this.isLoading = false;
					this.responseMessage = error.message;
				}
			),
			this.apiService.getBusiness().subscribe(
				data => {
					if (data.statusCode === 200) {
						this.devices = data.data.filtered_data;
					} else {
						this.deviceResponseMessage = data.msg;
						this.deviceResponse = "error";
					}
				}, error => {
					this.deviceResponse = "error";
					this.deviceResponseMessage = error?.error.msg;
				}
			)
		)

		// Group update form
		this.groupUpdateForm = this.fb.group({
			group_name: ['', [Validators.required]],
			device: [[], [Validators.required]]
		})
	}

	ngDoCheck(): void {
		// Add group list after creating group
		if (this.newGroup) {
			this.groupList.push({
				id: this.newGroup.id,
				group_name: this.newGroup.group_name,
				expand: false,
				devices: this.newGroup.devices
			});
			console.log(this.groupList);
			this.newGroup = null;
		}
	}

	// Delete group
	deleteGroup(id: any, index: number): void {
		const data = {
			"group_id": id
		}
		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");
		this.subs.sink = this.apiService.deleteGroup(data.group_id).subscribe(
			(data: any) => {
				if (data?.statusCode === 200) {
					this.groupList.splice(index, 1);
					// this.groupList = this.groupList.filter(group => group.id !== id);
					this.modalController.changeResponseStatus("success")
					this.modalController.changeResponseMessage(data?.msg);
					if (this.groupList.length === 0) {
						this.responseMessage = "Groups Not Found";
					}

				} else {
					this.modalController.changeResponseStatus("failed")
					this.modalController.changeResponseMessage(data?.msg)
				}
			}, error => {
				this.modalController.changeResponseStatus("failed")
				this.modalController.changeResponseMessage(error?.error.detail)
			});
			this.modalController.showAlertModal();
	}

	// Toggle device table
	toggleDeviceTable(index: number, event: any): void {
		let packageTable: any = document.querySelectorAll('.device-item__products');
		packageTable.forEach((element: any) => {
			element.style.height = '0';
		});
		this.groupList[index].expand = !this.groupList[index].expand;
		this.arrayExceptIndex(this.groupList, index);
		const targetElement = event.target.parentElement.parentElement.nextElementSibling;
		const targetElementHeight = targetElement.scrollHeight;
		if (this.groupList[index].expand === true) {
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

	// Open group update modal
	openGroupUpdateModal(index: number): void {
		this.isUpdateModal = true;
		this.updateGroupInfo = this.groupList[index];
		this.groupUpdateForm.patchValue({
			group_name: this.updateGroupInfo.group_name,
			device: this.updateGroupInfo.devices.map((p: any) => p.device_id)
		});
	}

	// Close group update modal
	closeGroupUpdateModal(): void {
		this.isUpdateModal = false;
		this.groupUpdateForm.reset();
	}

	// Group update
	handleGroupUpdate(): void {
		const devices = this.devices.filter((p: any) => {
			return this.groupUpdateForm.value.device.includes(p.device_id);
		})
		const data = {
			id: this.updateGroupInfo.id,
			group_name: this.groupUpdateForm.value.group_name,
			devices: devices
		}
		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");
		this.modalController.showAlertModal();
		this.subs.sink = this.apiService.updateGroup(data).subscribe(
			(response: any) => {
				console.log(response);
				if (response?.statusCode === 200) {
					this.groupList.map((group: any) => {
						if (group.id === response.data.id) {
							group.group_name = response.data.group_name;
							group.devices = response.data.devices;
						}
					})
					this.modalController.changeResponseStatus("success");
					this.modalController.changeResponseMessage(response?.msg);
					setTimeout(() => {
						this.closeGroupUpdateModal();
					}, 1000);
				} else {
					this.modalController.changeResponseStatus("failed");
					this.modalController.changeResponseMessage(response?.msg)
				}
			},
			error => {
				this.modalController.changeResponseStatus("failed");
				this.modalController.changeResponseMessage(error?.error.msg)
			}
		)
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
