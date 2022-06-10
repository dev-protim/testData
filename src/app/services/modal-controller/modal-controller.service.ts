import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AlertModalComponent } from 'src/app/helper-component/alert-modal/alert-modal.component';

@Injectable({
	providedIn: 'root'
})
export class ModalControllerService {

	private messageSource = new BehaviorSubject('');
  	responseMessage = this.messageSource.asObservable();

	private statusSource = new BehaviorSubject('');
  	responseStatus = this.statusSource.asObservable();

	constructor(private modalService: NzModalService) { }

	changeResponseMessage(message: string) {
        this.messageSource.next(message)
    }

	changeResponseStatus(status: string) {
        this.statusSource.next(status)
    }

	// getMessage(): Observable<any> {
    //     return this.subject.asObservable();
    // }

	showAlertModal() {
		const modal = this.modalService.create({
			nzTitle: '',
			nzCloseIcon: '',
			nzContent: AlertModalComponent,
			nzFooter: null,
			nzClassName: "small-modal alert-modal",
			nzWrapClassName: "modal-wrapper",
			nzMaskClosable: false
		});
		// console.log(message);
		// const instance = modal.getContentComponent();
		// // instance.componentReceiverMessage = message;
		// if (status == "waiting") {
		// 	instance.statusReceiver = status;
		// } else if (status === "success") {
		// 	instance.statusReceiver = status;
		// } else {
		// 	instance.statusReceiver = status;
		// 	// instance.componentReceiverMessage = message;
		// }
	}
}
