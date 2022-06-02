import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AlertModalComponent } from 'src/app/helper-component/alert-modal/alert-modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalControllerService {

	constructor(private modalService: NzModalService) { }

	showAlertModal(message: any): void {
		const modal = this.modalService.create({
			nzTitle: '',
			nzCloseIcon: '',
			nzContent: AlertModalComponent,
			nzFooter: null,
			nzClassName: "small-modal alert-modal",
			nzWrapClassName: "modal-wrapper",
			// nzNoAnimation: true,
			// nzAutofocus: null
		});
		console.log(message);
		const instance = modal.getContentComponent();
		if (message == "success") {
			instance.componentReceiver = 'success';
		} else if (message == "failed" || message == 500) {
			instance.componentReceiver = 'failed';
		}
	}
}
