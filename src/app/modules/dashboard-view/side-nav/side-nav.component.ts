import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

	// @Output() navCollapse = new EventEmitter<String>();
	@Input() navCollapsed: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	// collapseNav(name: string): void {
	// 	this.navCollapse.emit('collapse');
	// }

}
