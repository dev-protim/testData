import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
	selector: 'app-dashboard-header',
	templateUrl: './dashboard-header.component.html',
	styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

	// @ViewChild(HistoryComponent) dashboardHistoryComponent: any;

	@Output() isToggleCollapse = new EventEmitter<Boolean>();
	@Output() isToggleHistory = new EventEmitter<Boolean>();
	isSideNavToggle: boolean = false;
	isHistoryToggle: boolean = false;

	constructor() { }

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
	// collapseHistory(): void {
	// 	this.isHistoryToggle = !this.isHistoryToggle;
	// }

}
