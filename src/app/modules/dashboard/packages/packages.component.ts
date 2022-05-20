import { HttpClient, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { filter, map, Observable, of } from 'rxjs';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { Package } from './package.class';

@Component({
	selector: 'app-packages',
	templateUrl: './packages.component.html',
	styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

	packageList: Package[] | any;
	isVisible: boolean = false;
	isPackageInfo: any;

	fileList: NzUploadFile[] = [];
	isProgressWidth: any;
	uploading = false;
	uploadedFile: any;
	packageUploadForm: any;

	base64: string = "Base64...64";
	fileSelected?: any;
	imageUrl?: any;
	packageIdModel: any;
	fileUploadMessage: string = 'Your file is uploading...';

	url: any = "https://jsonplaceholder.typicode.com/posts";

	constructor(private apiService: ApiCallService, private http: HttpClient, private fb: FormBuilder, private msg: NzMessageService, private sant: DomSanitizer) { }

	ngOnInit(): void {
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
	*/
	openUploadModal(index: any): void {
		this.isVisible = true;
		this.isPackageInfo = index;
		console.log(this.isPackageInfo);
		/**
		 * @author Pranto
		 * @description Package path upload form
		 */
		this.packageUploadForm = this.fb.group({
			name: [this.isPackageInfo.package_name],
			packagePath: ['', [Validators.required]],
		})
	}
	handleCancel(): void {
		console.log('Button cancel clicked!');
		this.isVisible = false;
	}

	// beforeUpload = (file: NzUploadFile): boolean => {
	// 	this.fileList = [];
	// 	this.fileList = this.fileList.concat(file);
	// 	return false;
	// };

	beforeFileUpload = (file: NzUploadFile): boolean => {
		this.fileList = [];
		this.fileList = this.fileList.concat(file);
		this.fileSelected = this.fileList[0];
		// this.fileSelected = this.fileList;
		console.log(this.fileSelected);
		return false;
	};

	removeUploadedFile(): void {
		this.fileList = [];
	}

	onSelectedFile(event: any): void {
		// if (event.files?.length === 0) return;
		// this.fileList = [];
		this.fileSelected = <File>event.target.files[0];
		// this.fileList = this.fileList.concat(event.target.files[0]);
		// this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected));
		// this.base64 = "Base64...";
		// if (event.target.files.length > 0) {
		// 	const packagePath = event.target.files[0];
		// 	this.packageUploadForm.get('packagePath').setValue(packagePath);
		// 	console.log(event.target.files[0])
		// }
		console.log(<File>event.target.files[0]);
		// console.log(this.packageIdModel);
	}

	// handleChange({ file, fileList }: NzUploadChangeParam): void {
	// 	const status = file.status;
	// 	if (status !== 'uploading') {
	// 		console.log("Uploaded", file, fileList);
	// 	} else {
	// 		console.log("uploading",file.percent);
	// 		this.isProgressWidth = file.percent;
	// 		// file.
	// 	}
	// 	if (status === 'done') {
	// 		this.msg.success(`${file.name} file uploaded successfully.`);
	// 	} else if (status === 'error') {
	// 		console.log("uploading",file.percent);
	// 		this.msg.error(`${file.name} file upload failed.`);
	// 	}
	// }
	handleUpload(): void {
		// this.uploading = true;
		const formData = new FormData();
		// formData.append('name', this.packageUploadForm.get('name').value);
		console.log(typeof(formData));
		// formData.append('package_id', this.isPackageInfo.package_id);
		formData.append('file', this.fileSelected, this.fileSelected.url);
		// this.fileList.forEach((file: any) => {
		// 	formData.append('file', file, file.url);
		// });
		// formData.append('package_id', this.packageIdModel);
		// formData.append('file', this.fileSelected, this.fileSelected.url);
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// this.fileList.forEach((file: any) => {
		// //   formData.append('business_id', '010101010');
		//   formData.append('file', file);
		// });
		// this.uploading = true;
		// You can use any AJAX library you like
		this.http.post(this.url, formData, {
			reportProgress: true,
			observe: "events"
		})
		// .subscribe((event: any) => {
		// 	if (event.type === HttpEventType.UploadProgress) {
		// 		this.isProgressWidth = Math.round(event.loaded / event.total) * 100;
		// 		console.log(this.isProgressWidth);
		// 	}
		// 	else if (event.type === HttpEventType.Response) {
		// 		this.isProgressWidth = 0;
		// 		this.fileUploadMessage = "Your file uploaded successfully!";
		// 	}
		// })
		.pipe(map(
			(event: any) => {
				if (event.type === HttpEventType.UploadProgress) {
					this.isProgressWidth = Math.round(event.loaded / event.total) * 100;
					console.log(this.isProgressWidth)
				}
				else if (event.type === HttpEventType.Response) {
					this.isProgressWidth = 0;
				}
			}
		))
		.subscribe(
			res => {
			//   this.uploading = false;
			//   this.fileList = [];
			this.fileUploadMessage = "Your file uploaded successfully!";
			console.log(res, "response");
			//   this.msg.success('upload successfully.');
			},
			() => {
				this.fileUploadMessage = "There is an error with your file upload.";
			//   this.uploading = false;

			//   this.msg.error('upload failed.');
			}
		);
		// .subscribe(
		// 	res => {
		// 		this.fileUploadMessage = "Your file uploaded successfully!";
		// 	},
		// 	error => {
		// 		this.fileUploadMessage = "There is an error with your file upload.";
		// 	}
		// )
		// .subscribe({
		// 	complete: () => { ... }, // completeHandler
		// 	error: () => { ... },    // errorHandler
		// 	next: () => { ... },     // nextHandler
		// 	someOtherProperty: 42
		// });
	}
	// handleChange(): void {
	// 	const formData = new FormData();
	// 	this.fileList.forEach((file: any) => {
	// 		formData.append('business_id', '010101010');
	// 		formData.append('file', file);
	// 	});
	// 	// this.uploadedFile = file;
	// 	this.isProgressWidth = 0;
	// 	// this.uploading = true;
	// 	// console.log(file);
	// 	this.http.post('https://a657-103-113-175-2.ngrok.io/launcher/admin/change-wallpaper', formData, {
	// 		reportProgress: true,
	// 		observe: 'events'
	// 	})
	// 		.pipe(map(event => {
	// 			if (event.type === HttpEventType.UploadProgress) {
	// 				this.isProgressWidth = Math.round((100 / (event.total || 0) * event.loaded)) + "%";
	// 				console.log("events:", event.loaded);
	// 				// if (this.isProgressWidth === 100) {
	// 				// 	setTimeout(() => {
	// 				// 		this.isProgressWidth = 0;
	// 				// 		this.uploading = false;
	// 				// 	}, 1000);
	// 				// }
	// 			} else if (event.type === HttpEventType.Response) {
	// 				this.isProgressWidth = "0%";
	// 				// return event.body;
	// 			}
	// 		}))
	// 		.subscribe(
	// 			() => {
	// 				this.msg.success('upload successfully.');
	// 			},
	// 			() => {
	// 				this.msg.error('upload failed.');
	// 			}
	// 		);
	// }
	// frame(id: any): void {
	// 	if (this.isProgressWidth >= 100) {
	// 		clearInterval(id)
	// 	} else {
	// 		this.isProgressWidth++;
	// 	}
	// }


}
