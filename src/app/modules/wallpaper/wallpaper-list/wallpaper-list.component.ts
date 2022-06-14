import { HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';
import { Wallpaper } from '../wallpaper';

@Component({
	selector: 'app-wallpaper-list',
	templateUrl: './wallpaper-list.component.html',
	styleUrls: ['./wallpaper-list.component.scss']
})
export class WallpaperListComponent implements OnInit, DoCheck, OnDestroy {

	@Input() newWallpaper: any;
	subs = new SubSink();
	wallpaperList: Wallpaper[] = [];
	responseMessage: string = "";
	isLoading: boolean = true;
	updateWallpaperForm: any;
	isUpdateModal: boolean = false;
	isUpdateLoading: boolean = false;
	wallpaperMode: any = ['portrait', 'landscape'];
	getWallpaperInfo: any; // Get wallpaper info when update wallpaper
	fileList: NzUploadFile[] = [];
	isProgressWidth: any;
	progressStatus: any;
	fileSelected?: any;
	fileUploadMessage: string = 'Your file is uploading...';
	isFileValidation: boolean = false;
	isWallpaperUploading: boolean = false;

	constructor(private apiService: ApiCallService,
		private modalController: ModalControllerService,
		private fb: FormBuilder) { }

	/**
	 * @author Pranto
	 * @description Get wallpaper list, add wallpaper list after creating wallpaper
	 * @description Control wallpaper file
	 * @description Delete wallpaper, update wallpaper, open update wallpaper modal, close update wallpaper modal
	 */

	ngOnInit(): void {
		this.subs.sink = this.apiService.getWallpaper().subscribe(
			(response: any) => {
				this.isLoading = false;
				if (response.statusCode === 200) {
					this.wallpaperList = response.data;
					this.wallpaperList.forEach((list: any) => {
						list["portraitCopy"] = "copy";
						list["landscapeCopy"] = "copy";
					})
					console.log(this.wallpaperList);
				} else {
					this.responseMessage = response.msg;
				}
			}, (error: any) => {
				this.isLoading = false;
				this.responseMessage = error?.error.msg;
			}
		)

		// Update wallpaper form
		this.updateWallpaperForm = this.fb.group({
			wallpaper_id: [''],
			wallpaper_name: [''],
			mode: ['', [Validators.required]],
		})
	}

	// Receive newly created wallpaper
	ngDoCheck(): void {
		if (this.newWallpaper) {
			this.wallpaperList.push({
				...this.newWallpaper, portraitCopy: "copy", landscapeCopy: "copy"
			})
			this.newWallpaper = null;
		}
	}

	// Copy wallpaper link
	copyInput(wallpaperLink: any, wallpaper: any, type: string) {
		if (type === "portrait") {
			wallpaper.portraitCopy = "copied";
			setTimeout(() => {
				wallpaper.portraitCopy = "copy";
			}, 2000);
		} else if (type === "landscape") {
			wallpaper.landscapeCopy = "copied";
			setTimeout(() => {
				wallpaper.landscapeCopy = "copy";
			}, 2000);
		}
		const content = wallpaperLink.textContent;
		navigator['clipboard'].writeText(content).then().catch(e => console.error(e));
	}

	// Delete wallpaper
	deleteWallpaper(id: string, index: number) {
		const data = {
			"wallpaper_id": id
		}
		this.modalController.showAlertModal();
		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");
		this.subs.sink = this.apiService.deleteWallpaper(data.wallpaper_id).subscribe(
			(response: any) => {
				if (response.statusCode === 200) {
					this.wallpaperList.splice(index, 1);
					this.modalController.changeResponseStatus("success")
					this.modalController.changeResponseMessage(response?.msg);
					if (this.wallpaperList.length === 0) {
						this.responseMessage = "Wallpapers Not Found";
					}
				} else {
					this.modalController.changeResponseStatus("failed")
					this.modalController.changeResponseMessage(response?.msg)
				}
			}, (error: any) => {
				console.log(error);
				this.modalController.changeResponseStatus("failed")
				this.modalController.changeResponseMessage(error?.error.msg)
				if (error.status === 0) {
					this.modalController.changeResponseMessage(error?.message)
				}
			}
			)
	}

	// Update wallpaper
	openUpdateModal(index: number) {
		this.isUpdateModal = true;
		this.getWallpaperInfo = this.wallpaperList[index];
		// this.getWallpaperInfo.wallpaper_name = this.getWallpaperInfo.wallpaper_name.titleCase();
		this.updateWallpaperForm.patchValue({
			wallpaper_id: this.getWallpaperInfo.wallpaper_id,
			wallpaper_name: this.getWallpaperInfo.wallpaper_name
		})
	}

	// Back to update modal
	backToUpdateForm(): void {
		this.isWallpaperUploading = false;
		this.isProgressWidth = 0;
		this.fileList = [];
		this.fileUploadMessage = 'Your file is uploading...';
	}

	// Close update modal
	closeUpdateModal(): void {
		this.isUpdateModal = false;
		this.updateWallpaperForm.reset();
		this.backToUpdateForm();
		this.getWallpaperInfo = null;
	}

	// Check file before upload in upload modal
	beforeFileUpload = (file: NzUploadFile): boolean | any => {
		this.fileList = [];
		this.fileList = this.fileList.concat(file);
		this.fileSelected = this.fileList[0];
		console.log(this.fileSelected);
		if (this.fileSelected.type === "image/png" || this.fileSelected.type === "image/jpeg") {
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

	// Update wallpaper
	handleUpdate(): void {
		this.isWallpaperUploading = true;
		const formData = new FormData();
		formData.append('wallpaper_id', this.updateWallpaperForm.value.wallpaper_id);
		formData.append('mode', this.updateWallpaperForm.value.mode);
		formData.append('file', this.fileSelected);

		this.subs.sink = this.apiService.updateWallpaper(formData)
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
							this.wallpaperList.map((wallpaper: any) => {
								if (wallpaper.wallpaper_id === formData.get('wallpaper_id')) {
									if (response?.body.data.mode === "portrait") {
										wallpaper.portrait = response?.body.data.file_url;
									} else if (response?.body.data.mode === "landscape") {
										wallpaper.landscape = response?.body.data.file_url;
									}
								}
							})
						} else {
							this.progressStatus = "exception";
							this.fileUploadMessage =  response?.msg;
						}
					}
				},
				(err: any) => {
					console.log(err, "outside");
					this.isProgressWidth = 100;
					this.progressStatus = "exception";
					if (err?.status === 422 || err?.status === 404) {
						this.fileUploadMessage =  err?.message;
					} else {
						this.fileUploadMessage =  err?.error.msg;
					}
				}
			)
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
