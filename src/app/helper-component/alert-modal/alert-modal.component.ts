import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { ModalControllerService } from 'src/app/services/modal-controller/modal-controller.service';
import { SubSink } from 'subsink';


@Component({
	selector: 'app-alert-modal',
	templateUrl: './alert-modal.component.html',
	styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit, OnDestroy {

	statusReceiver: string = "";
	messageReceiver: string = "";
	subs = new SubSink();

	constructor(private modal: NzModalRef, private modalController: ModalControllerService) { }

	ngOnInit(): void {
		this.subs.add(
			this.modalController.responseStatus.subscribe(status => this.statusReceiver = status),
			this.modalController.responseMessage.subscribe(message => this.messageReceiver = message)
		);

		setTimeout(() => {
			this.modal.destroy();
		}, 2000);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

}
