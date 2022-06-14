import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiCallService } from 'src/app/services/api-call/api-call.service';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';

@Component({
	selector: 'app-create-wallpaper',
	templateUrl: './create-wallpaper.component.html',
	styleUrls: ['./create-wallpaper.component.scss']
})
export class CreateWallpaperComponent implements OnInit, OnDestroy {

	// @ViewChild(GroupListComponent) groupListComponent: any;

	isWallpaperModalMobile: boolean = false;
	createWallpaperForm: any;
	subs = new SubSink();
	@Output() createWallpaperEmitter:EventEmitter<any> = new EventEmitter<any>(); // To pass the created group to the group list component
	newWallpaper: any;

	constructor(private fb: FormBuilder,
		private apiService: ApiCallService,
		private modalController: ModalControllerService) { }

	/**
	 * @author Pranto
	 * @description Create wallpaper
	 */

	ngOnInit(): void {
		// Create wallpaper reactive form
		this.createWallpaperForm = this.fb.group({
			wallpaper_name: ['', [Validators.required]]
		})
	}

	// Close event form side-modal in mobile
	closeWallpaperModalMobile(): void {
		this.isWallpaperModalMobile = false;
	}

	// Submit wallpaper form
	handleSubmit(): void {
		const data = {
			wallpaper_name: this.createWallpaperForm.value.wallpaper_name
		}
		const formData = new FormData();
		formData.append('wallpaper_name', data.wallpaper_name);
		this.modalController.changeResponseStatus("waiting");
		this.modalController.changeResponseMessage("Please wait...");

		this.apiService.createWallpaper(formData).subscribe(
			(response: any) => {
				if (response.statusCode === 201) {
					this.createWallpaperForm.reset();
					this.modalController.changeResponseStatus("success")
					this.modalController.changeResponseMessage(response?.msg);
					this.createWallpaperEmitter.emit(response.data);
				} else {
					this.modalController.changeResponseStatus("failed")
					this.modalController.changeResponseMessage(response?.msg);
				}
			}, (error: any) => {
				console.log(error);
				this.modalController.changeResponseStatus("failed")
				this.modalController.changeResponseMessage(error?.error.msg)
			}
		)
		this.modalController.showAlertModal();
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
