import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map, Observable } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { Package } from './package.class';

@Component({
	selector: 'app-packages',
	templateUrl: './packages.component.html',
	styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

	packageList: Package[] | any = [];
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

	url: any = "https://jsonplaceholder.typicode.com/posts";
	progressStatus: any;
	isUploadedStatus: boolean = false;

	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	packageStatus: any[] = ['active', 'deactive'];
	noPathPackageList: any = [];

	constructor(private apiService: ApiCallService, private http: HttpClient, private fb: FormBuilder) {
		/**
		 * @author Pranto
		 * @description Get package list from API
		 */
		 this.apiService.getPackages().subscribe(data => {
			this.packageList = data;
			this.packageList.data.forEach((element: any) => {
				element["copy"] = "copy";
			});
			console.log(this.packageList);
		});
	}

	ngOnInit(): void {


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
	 * @description Open apk upload modal and submit to package path
	 * @description Package path upload form
	*/
	openUploadModal(index: any): void {
		this.isPathModalVisible = true;
		this.isPackageInfo = index;
		this.packageUploadForm = this.fb.group({
			name: [this.isPackageInfo.package_name],
			packagePath: ['', [Validators.required]],
		})
	}
	closeUploadModal(): void {
		this.isPathModalVisible = false;
		this.uploading = false;
		this.isPackageInfo = null;
		this.fileList = [];
		this.isUploadedStatus = false;
		this.isProgressWidth = 0;
	}

	beforeFileUpload = (file: NzUploadFile): boolean => {
		this.fileList = [];
		this.fileList = this.fileList.concat(file);
		this.fileSelected = this.fileList[0];
		console.log(this.fileSelected);
		return false;
	};

	removeUploadedFile(): void {
		this.fileList = [];
	}

	backToUploadForm(): void {
		this.uploading = false;
		this.isUploadedStatus = false;
		this.isProgressWidth = 0;
	}

	handleUpload(): void {
		this.uploading = true;
		this.isUploadedStatus = true;
		const formData = new FormData();
		console.log(typeof(formData));
		formData.append('package_id', this.isPackageInfo.package_id);
		formData.append('file', this.fileSelected, this.fileSelected.url);

		this.http.post(this.url, formData, {
			reportProgress: true,
			observe: "events"
		})
		.pipe(map(
			(event: any) => {
				if (event.type === HttpEventType.UploadProgress) {
					this.isProgressWidth = Math.round(100 * event.loaded / event.total);
					console.log(this.isProgressWidth)
				}
				else if (event.type === HttpEventType.Response) {
					this.isProgressWidth = 100;
				}
			}
		))
		.subscribe(
			res => {
				this.fileUploadMessage = "Your file is uploading...";
				this.progressStatus = "normal";
			},
			error => {
				this.fileUploadMessage = "There is an error with your file upload.";
				this.progressStatus = "exception";
			},
			() => {
				this.fileUploadMessage = "Your file uploaded successfully!";
				this.progressStatus = "success";
			}
		)
	}

	/**
	 * @author Pranto
	 * @description Open update modal and submit to package path
	 */
	openUpdateModal(index: any): void {
		this.isUpdateModalVisible = true;
		this.isPackageInfo = index;
		let status;
		if (this.isPackageInfo.status == true) {
			status = 'active';
		} else {
			status = 'deactive'
		}
		console.log(this.isPackageInfo);
		this.packageUpdateForm = this.fb.group({
			name: [this.isPackageInfo.package_name],
			type: [this.isPackageInfo.type, [Validators.required]],

			status: [status, [Validators.required]],
		})
	}
	closeUpdateModal(): void {
		this.isUpdateModalVisible = false;
		this.isPackageInfo = null;
	}
	handleUpdate(): void {
		this.closeUpdateModal();
	}

	/**
	 * @author Pranto
	 * @description Open check path validation modal
	 */
	openPathValidationModal(): void {
		this.isPathAvailableModal = true;
		this.noPathPackageList = [];
		this.noPathPackageList = this.packageList.data.filter((el: any) => {
			return el.apk_path == "";
		});
	}
	closePathValidationModal(): void {
		this.isPathAvailableModal = false;
	}

}
