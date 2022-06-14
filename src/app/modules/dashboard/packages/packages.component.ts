import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';
import { Package } from './package';

@Component({
	selector: 'app-packages',
	templateUrl: './packages.component.html',
	styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {

	packageList: Package[] = [];
	isLoading: boolean | any = true;
	isPathModalVisible: boolean = false;
	isUpdateModalVisible: boolean = false;
	isPathAvailableModal: boolean = false;
	packageInfo: any;

	isFileValidation: boolean = false;
	fileList: NzUploadFile[] = [];
	isProgressWidth: any;
	isUploading: boolean = false;
	packageUploadForm: any;
	packageUpdateForm: any;

	fileSelected?: any;
	fileUploadMessage: string = 'Your file is uploading...';

	progressStatus: any;

	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	packageStatus: any[] = ['active', 'deactive'];
	noPathPackageList: any = [];
	noPackageString: string = "No data found";
	// packageUpdateMessage: string = "Your package is updating...";
	// packageUpdateStatus: string = 'waiting';
	// isUpdatedStatus: boolean = false;
	subs = new SubSink();

	constructor(private apiService: ApiCallService,
		private http: HttpClient,
		private fb: FormBuilder,
		private modalController: ModalControllerService) {
		/**
		 * @author Pranto
		 * @description Get package list from API
		 */

	}

	ngOnInit(): void {
		this.getAllPackages();
		// Package upload form
		this.packageUploadForm = this.fb.group({
			name: ['']
		})
		// Package update form
		this.packageUpdateForm = this.fb.group({
			name: [''],
			id: [''],
			apk_path: [''],
			type: ['', [Validators.required]],
			status: ['', [Validators.required]],
		})
	}

	getAllPackages(): void {
		this.subs.sink = this.apiService.getPackages().subscribe(

			response => {
				this.isLoading = false;
				if (response?.statusCode === 200) {
					this.packageList = response.data;
					this.packageList.forEach((element: any) => {
						element["copy"] = "copy";
						element.type = element.type.replace(/_/g, " ");
						element.created_at = element.created_at.split(" ")[0];
					});
				} else {
					console.log(response.body.message);
					this.noPackageString = response.body.msg;
				}
			},
			error => {
				this.isLoading = false;
				console.log(error)
				this.noPackageString = error?.error.msg;
				if (error?.status === 0) {
					this.noPackageString = error?.message;
				}
			}
		);
	}

	/**
	 * @author Pranto
	 * @description Copy package path to clipboard
	*/
	copyInput(packagePath: any, packageItem: any) {
		packageItem.copy = "copied";
		const content = packagePath.textContent;
		navigator['clipboard'].writeText(content).then().catch(e => console.error(e));
		setTimeout(() => {
			packageItem.copy = "copy";
		}, 2000);
	}

	/**
	 * @author Pranto
	 * @description Functions of package upload, update and check path validation
	*/

	// Open package upload modal
	openUploadModal(index: any): void {
		this.isPathModalVisible = true;
		this.packageInfo = this.packageList[index];
		this.packageUploadForm.setValue({
			name: this.packageInfo.package_name,
		})
	}

	// Close package upload modal
	closeUploadModal(): void {
		this.isPathModalVisible = false;
		this.isUploading = false;
		this.packageInfo = null;
		this.fileList = [];
		this.isProgressWidth = 0;
	}

	// Check file before upload in upload modal
	beforeFileUpload = (file: NzUploadFile): boolean | any => {
		this.fileList = [];
		this.fileList = this.fileList.concat(file);
		this.fileSelected = this.fileList[0];
		if (this.fileSelected.type === "application/vnd.android.package-archive") {
			this.isFileValidation = false;
		} else {
			this.isFileValidation = true;
		}
		return false;
	};

	// Remove uploaded package file in modal
	removeUploadedFile(): void {
		this.fileList = [];
		this.isFileValidation = true;
	}

	// Back to package path upload default view
	backToUploadForm(): void {
		this.isUploading = false;
		this.isProgressWidth = 0;
		this.fileUploadMessage = 'Your file is uploading...';
	}

	// Upload package path
	handleUpload(): any {
		this.isUploading = true;
		const formData = new FormData();
		formData.append('package_id', this.packageInfo.package_id);
		formData.append('file', this.fileSelected);

		this.subs.sink = this.apiService.uploadPackagePath(formData)
			.subscribe(
				(response: any) => {
					if (response.type === HttpEventType.UploadProgress) {
						this.isProgressWidth = Math.round(100 * response.loaded / response.total);
						this.progressStatus = "normal";
					}
					else if (response.type === HttpEventType.Response) {
						this.isProgressWidth = 100;
						if (response?.body.statusCode === 200) {
							this.fileUploadMessage = response?.body?.msg;
							this.progressStatus = "success";
							this.packageList.map((pack: any) => {
								if (pack.package_id === formData.get('package_id')) {
									pack.apk_path = response?.body?.data?.apk_path;
								}
							})
						} else {
							this.progressStatus = "exception";
							this.fileUploadMessage =  response?.msg;
						}
					}
				},
				(err: any) => {
					this.isProgressWidth = 100;
					this.progressStatus = "exception";
					this.fileUploadMessage = err?.error.msg;
					if (err?.status === 0) {
						this.fileUploadMessage =  err?.message;
					}
				}
			)
	}

	// Open package update modal
	openUpdateModal(index: any): void {
		this.isUpdateModalVisible = true;
		this.packageInfo = this.packageList[index];
		let status;
		if (this.packageInfo.status == true) {
			status = 'active';
		} else {
			status = 'deactive'
		}
		this.packageUpdateForm.setValue({
			name: this.packageInfo.package_name,
			id: this.packageInfo.package_id,
			apk_path: this.packageInfo.apk_path,
			type: this.packageInfo.type.split(' ').join('_'),
			status: status,
		})
	}

	// Close package update modal
	closeUpdateModal(): void {
		this.isUpdateModalVisible = false;
		this.packageInfo = null;
		this.packageUpdateForm.reset();
	}

	// Submit package update form
	handleUpdate(): void {
		const data = {
			package_id: this.packageUpdateForm.value.id,
			apk_path: this.packageUpdateForm.value.apk_path,
			type: this.packageUpdateForm.value.type,
			status: this.packageUpdateForm.value.status === 'active' ? true : false,
		}
		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");
		this.modalController.showAlertModal();
		this.subs.sink = this.apiService.updateInformation(data).subscribe(
			(response: any) => {
				console.log(response);
				if (response?.statusCode === 200) {
					this.packageList.map((pack: any) => {
						if (pack.package_id === data.package_id) {
							pack.type = data.type;
							pack.status = data.status;
						}
					})
					this.modalController.changeResponseStatus("success");
					this.modalController.changeResponseMessage(response?.msg);
					setTimeout(() => {
						this.closeUpdateModal();
					}, 1000);
				} else {
					this.modalController.changeResponseStatus("failed");
					this.modalController.changeResponseMessage(response?.msg)
				}
		},
		(error: any) => {
			this.modalController.changeResponseStatus("failed");
			this.modalController.changeResponseMessage(error?.error.msg)
			if (error.status === 0) {
				this.modalController.changeResponseMessage(error?.message)
			}
		}
		)
	}

	// Open check path validation modal
	openPathValidationModal(): void {
		this.isPathAvailableModal = true;
		this.noPathPackageList = [];
		this.noPathPackageList = this.packageList.filter((el: any) => {
			return el.apk_path == "";
		});
	}

	// Close check path validation modal
	closePathValidationModal(): void {
		this.isPathAvailableModal = false;
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
