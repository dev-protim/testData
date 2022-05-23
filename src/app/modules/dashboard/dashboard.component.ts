import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map } from 'rxjs';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	isPackageModal: boolean = false;
	fileList: NzUploadFile[] = [];
	isProgressWidth: any;
	fileSelected?: any;
	fileUploadMessage: string = 'Your file is uploading...';

	uploading: boolean = false;
	packageUploadForm: any;
	url: any = "https://jsonplaceholder.typicode.com/posts";
	progressStatus: any;
	isUploadedStatus: boolean = false;

	packageStatus: any[] = [true, false];
	packageType: any[] = ['launcher_apps', 'locker_apps', 'both'];
	isInstalled: any[] = [true, false];

	constructor(private http: HttpClient, private fb: FormBuilder) { }

	ngOnInit(): void {
		this.packageUploadForm = this.fb.group({
			name: ['', [Validators.required]],
			status: ['', [Validators.required]],
			type: ['', [Validators.required]],
			isInstalled: ['', [Validators.required]],
			fileUpload: [''],
		})
	}

	openUploadModal(): void {
		this.isPackageModal = true;
	}

	closeModal(): void {
		this.isPackageModal = false;
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

	handleSubmit(): void {
		this.uploading = true;
		this.isUploadedStatus = true;
	}

}
