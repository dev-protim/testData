import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-dashboard-view',
	templateUrl: './dashboard-view.component.html',
	styleUrls: ['./dashboard-view.component.scss']
})
export class DashboardViewComponent implements OnInit {

	isSideNav: boolean | any;

	constructor() { }

	ngOnInit(): void {
	}

	/**
	 * @author | Pranto
	 * @description | Toggle side navbar
	 */
	toggleSideNav(event: any): void {
		this.isSideNav = event;
	}

}
