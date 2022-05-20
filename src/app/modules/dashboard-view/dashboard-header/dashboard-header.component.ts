import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { DasbboardControllerService } from 'src/app/services/dashboard-controller/dasbboard-controller.service';
import { HistoryComponent } from '../../dashboard/history/history.component';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './dashboard-header.component.html',
	styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

	@ViewChild(HistoryComponent) dashboardHistoryComponent: any;

	@Output() isToggleCollapse = new EventEmitter<Boolean>();
	@Output() isToggleHistory = new EventEmitter<Boolean>();
	isSideNavToggle: boolean = false;
	isHistoryToggle: boolean = false;

	constructor(public dashboardViewController: DasbboardControllerService) { }

	ngOnInit(): void {
	}

	// ngAfterViewInit(): void {
	// 	this.collapseHistory();
	// }

	/**
	 * @author | Pranto
	 * @description | Toggle side navbar
	 */
	collapseSideNav(): void {
		this.isSideNavToggle = !this.isSideNavToggle;
		if (this.isSideNavToggle) {
			this.isToggleCollapse.emit(true);
		} else {
			this.isToggleCollapse.emit(false);
		}
	}

	/**
	 * @author | Pranto
	 * @description | Toggle history
	 */
	collapseHistory(): void {
		this.isHistoryToggle = !this.isHistoryToggle;
		this.dashboardViewController.dashboardHistorySendMessage(this.isHistoryToggle);
	}

}
