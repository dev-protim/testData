import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { SubSink } from 'subsink';
import { Package } from './package.class';

@Component({
	selector: 'app-packages',
	templateUrl: './packages.component.html',
	styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit, OnDestroy {

	packageList: Package[] | any = [];
	isLoading: boolean | any = true;
	isPathModalVisible: boolean = false;
	isUpdateModalVisible: boolean = false;
	isPathAvailableModal: boolean = false;
	isPackageInfo: any;

	fileList: NzUploadFile[] = [];
	isProgressWidth: any;
	uploading: boolean = false;
	packageUploadForm: any;
	packageUpdateForm: any;

	fileSelected?: any;
	fileUploadMessage: string = 'Your file is uploading...';

	progressStatus: any;
	isUploadedStatus: boolean = false;

	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	packageStatus: any[] = ['active', 'deactive'];
	noPathPackageList: any = [];
	noPackageString: string = "No data found";
	packageUpdateMessage: string = "Your file is uploading...";
	packageUpdateStatus: string = 'waiting';
	isUpdatedStatus: boolean = false;
	subs = new SubSink();

	constructor(private apiService: ApiCallService, private http: HttpClient, private fb: FormBuilder) {
		/**
		 * @author Pranto
		 * @description Get package list from API
		 */
		this.subs.sink = this.apiService.getPackages().subscribe(

			data => {
				this.packageList = data;
				this.isLoading = false;
				this.packageList.data.forEach((element: any) => {
					element["copy"] = "copy";
				});
				console.log(this.packageList);
			},
			error => {
				let errorMessage = error.error.detail;
				if (error?.status === 0) {
					this.noPackageString = error?.message;
				} else {
					this.noPackageString = errorMessage;
				}
			}
		);
	}

	ngOnInit(): void {
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

	/**
	 * @author Pranto
	 * @description Functions of package upload, update and check path validation
	*/

	// Open package upload modal
	openUploadModal(index: any): void {
		this.isPathModalVisible = true;
		this.isPackageInfo = index;
		this.packageUploadForm.setValue({
			name: this.isPackageInfo.package_name,
		})
	}

	// Close package upload modal
	closeUploadModal(): void {
		this.isPathModalVisible = false;
		this.uploading = false;
		this.isPackageInfo = null;
		this.fileList = [];
		this.isUploadedStatus = false;
		this.isProgressWidth = 0;
	}

	// Convert file to base64
	toDataUrl(file: any): any {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function (e: any) {
			file.thumbUrl = e.target.result;
		};
	}

	// Check file before upload in upload modal
	beforeFileUpload = (file: NzUploadFile): boolean | any => {
		this.fileList = [];
		this.fileList = this.fileList.concat(file);
		this.fileSelected = this.fileList[0];
		console.log(this.fileSelected);
		// this.toDataUrl(this.fileSelected);
		return false;
	};

	// Remove uploaded package file in modal
	removeUploadedFile(): void {
		this.fileList = [];
	}

	// Back to package path upload default view
	backToUploadForm(): void {
		this.uploading = false;
		this.isUploadedStatus = false;
		this.isProgressWidth = 0;
	}

	// Upload package path
	handleUpload(): any {
		this.uploading = true;
		this.isUploadedStatus = true;
		const formData = new FormData();
		console.log(typeof(formData));
		formData.append('package_id', this.isPackageInfo.package_id);
		formData.append('file', this.fileSelected);
		// const data = {
		// 	file: this.fileSelected.thumbUrl,
		// 	folder: "/yolauncher/assets",
		// 	type: "upload",
		// 	filter: "custom",
		// 	name: this.isPackageInfo.package_id,
		// 	file_type: "apk",
		// 	compression: false,
		// }
		// const data = {
		// 	file: this.fileSelected,
		// 	package_id: this.isPackageInfo.package_id
		// }
		// console.log(data);
		// const finalData = {
		// 	folder_path: data.folder,
		// 	package_id: data.name
		// }

		this.subs.sink = this.apiService.uploadPackagePath(formData)
			.subscribe(

				(event: any) => {
					if (event.type === HttpEventType.UploadProgress) {
						this.isProgressWidth = Math.round(100 * event.loaded / event.total);
						this.progressStatus = "normal";
					}
					else if (event.type === HttpEventType.Response) {
						this.isProgressWidth = 100;
						if (event?.body.status === 200) {
							this.fileUploadMessage = event?.body?.msg;
							this.progressStatus = "success";
							this.isPackageInfo.apk_path = event?.body?.data?.apk_path;
							// this.subs.sink = this.apiService.confirmUploadPackagePath(finalData).subscribe(
							// 	(res: any) => {
							// 		if (res.type === HttpEventType.Response) {
							// 			if (res?.body.status === 200) {
							// 				this.fileUploadMessage = res?.body?.msg;
							// 				this.progressStatus = "success";
							// 				this.isPackageInfo.apk_path = res?.body?.data?.apk_path;

							// 			} else {
							// 				this.progressStatus = "exception";
							// 				this.fileUploadMessage =  res?.msg;
							// 			}
							// 		}
							// 	},
							// 	(error: any) => {
							// 		this.isProgressWidth = 100;
							// 		if (error?.status === 422 || error?.status === 404) {
							// 			this.progressStatus = "exception";
							// 			this.fileUploadMessage =  error?.message;
							// 		} else {
							// 			this.progressStatus = "exception";
							// 			this.fileUploadMessage =  error?.error.msg;
							// 		}
							// 	});
						} else {
							this.progressStatus = "exception";
							this.fileUploadMessage =  event?.msg;
						}
					}
				},
				(err: any) => {
					console.log(err, "outside");
					this.isProgressWidth = 100;
					this.progressStatus = "exception";
					if (err?.status === 422 || err?.status === 404) {
						// this.progressStatus = "exception";
						this.fileUploadMessage =  err?.message;
					} else {
						// this.progressStatus = "exception";
						this.fileUploadMessage =  err?.error.msg;
					}
					// if (err?.error.message) {
					// 	this.fileUploadMessage =  err?.error.message;
					// } else if (err?.status === 0) {
					// 	this.fileUploadMessage =  err?.message;
					// } else {
					// 	this.fileUploadMessage =  err?.error.msg;
					// }
				}
			)
	}

	// Open package update modal
	openUpdateModal(index: any): void {
		this.isUpdateModalVisible = true;
		this.isPackageInfo = index;
		let status;
		if (this.isPackageInfo.status == true) {
			status = 'active';
		} else {
			status = 'deactive'
		}
		this.packageUpdateForm.setValue({
			name: this.isPackageInfo.package_name,
			id: this.isPackageInfo.package_id,
			apk_path: this.isPackageInfo.apk_path,
			type: this.isPackageInfo.type,
			status: status,
		})
	}

	// Back to default view of package update modal
	backToUpdateForm(): void {
		this.uploading = false;
		this.isUpdatedStatus = false;
		this.packageUpdateMessage = "Your file is uploading...";
		this.packageUpdateStatus = 'waiting';
	}

	// Close package update modal
	closeUpdateModal(): void {
		this.isUpdateModalVisible = false;
		this.isPackageInfo = null;
		this.backToUpdateForm();
	}

	// Submit package update form
	handleUpdate(): void {
		const data = {
			package_id: this.packageUpdateForm.value.id,
			apk_path: this.packageUpdateForm.value.apk_path,
			type: this.packageUpdateForm.value.type,
			status: this.packageUpdateForm.value.status === 'active' ? true : false,
		}
		this.uploading = true;
		this.isUpdatedStatus = true;
		this.subs.sink = this.apiService.updateInformation(data).subscribe(
			(event: any) => {
			if (event.type === HttpEventType.Response) {
				if (event?.body.status === 200) {
					this.isPackageInfo.type = event?.body.data.type;
					this.isPackageInfo.status = event?.body.data.status;
					this.packageUpdateStatus = 'success';
					this.packageUpdateMessage = event?.body.msg;
				} else {
					this.packageUpdateMessage = event?.message;
					this.packageUpdateStatus = 'failed';
				}
			}
		},
		(error: any) => {
			this.packageUpdateStatus = 'failed';
			this.packageUpdateMessage = error?.message;
		}
		)
	}

	// Open check path validation modal
	openPathValidationModal(): void {
		this.isPathAvailableModal = true;
		this.noPathPackageList = [];
		this.noPathPackageList = this.packageList.data.filter((el: any) => {
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
