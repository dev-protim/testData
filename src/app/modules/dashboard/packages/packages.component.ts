import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
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

			data => {
				this.isLoading = false;
				if (data?.statusCode === 200) {
					this.packageList = data.data;
					console.log(this.packageList);
					this.packageList.forEach((element: any) => {
						element["copy"] = "copy";
						element.type = element.type.replace(/_/g, " ");
						element.created_at = element.created_at.split(" ")[0];
					});
					// replace _ with space
					// this.packageList.forEach((element: any) => {
					// }
				} else {
					console.log(data.body.message);
				}
			},
			error => {
				this.isLoading = false;
				console.log(error)
				let errorMessage = error.error.detail;
				if (error?.status === 0) {
					this.noPackageString = error?.message;
				} else {
					this.noPackageString = errorMessage;
				}
			}
		);
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
		this.packageInfo = this.packageList[index];
		this.packageUploadForm.setValue({
			name: this.packageInfo.package_name,
		})
	}

	// Close package upload modal
	closeUploadModal(): void {
		this.isPathModalVisible = false;
		this.uploading = false;
		this.packageInfo = null;
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
		formData.append('package_id', this.packageInfo.package_id);
		formData.append('file', this.fileSelected);
		// const data = {
		// 	file: this.fileSelected.thumbUrl,
		// 	folder: "/yolauncher/assets",
		// 	type: "upload",
		// 	filter: "custom",
		// 	name: this.packageInfo.package_id,
		// 	file_type: "apk",
		// 	compression: false,
		// }
		// const data = {
		// 	file: this.fileSelected,
		// 	package_id: this.packageInfo.package_id
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
						if (event?.body.statusCode === 200) {
							this.fileUploadMessage = event?.body?.msg;
							this.progressStatus = "success";
							this.packageList.map((pack: any) => {
								if (pack.package_id === formData.get('package_id')) {
									pack.apk_path = event?.body?.data?.apk_path;
								}
							})
							this.packageInfo = null;
							// this.packageInfo.apk_path = event?.body?.data?.apk_path;
							// this.subs.sink = this.apiService.confirmUploadPackagePath(finalData).subscribe(
							// 	(res: any) => {
							// 		if (res.type === HttpEventType.Response) {
							// 			if (res?.body.statusCode === 200) {
							// 				this.fileUploadMessage = res?.body?.msg;
							// 				this.progressStatus = "success";
							// 				this.packageInfo.apk_path = res?.body?.data?.apk_path;

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
		// show package info based on pack index
		this.packageInfo = this.packageList[index];
		console.log(this.packageInfo);

		// this.packageInfo = pack;
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
			type: this.packageInfo.type,
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
		this.packageInfo = null;
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
					this.packageList.map((pack: any) => {
						if (pack.package_id === data.package_id) {
							pack.type = data.type;
							pack.status = data.status;
						}
					})
					this.packageInfo = null;
					this.packageUpdateStatus = 'success';
					this.packageUpdateMessage = event?.body.msg;
					console.log(this.packageList)
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
