import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
	selector: 'app-alert-modal',
	templateUrl: './alert-modal.component.html',
	styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

	@Input() componentReceiver?: string;

	constructor(private modal: NzModalRef) { }

	ngOnInit(): void {
		setTimeout(() => {
			this.modal.destroy();
		}, 2500);
	}

}
