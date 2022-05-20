import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DasbboardControllerService } from 'src/app/services/dashboard-controller/dasbboard-controller.service';

@Component({
	selector: 'app-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

	isHistory: boolean = false;
	isHistorySubscription: Subscription | any;

	constructor(public dashboardViewController: DasbboardControllerService) { }

	ngOnInit(): void {
		/**
		 * @author Pranto
		 * @description Control dashboard history in mobile view
		 */
		this.isHistorySubscription = this.dashboardViewController.dashboardHistoryGetMessage().subscribe(message => {
			this.isHistory = message;
		});
	}

	ngDestroy(): void {
		this.isHistorySubscription.unsubscribe();
	}

}
