import { Component, HostListener, OnInit } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	binding: any;
	fixedWidth: any;
	fixedLeft: any;

	constructor() { }

	ngOnInit(): void {
		this.bannerPosition();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.bannerPosition();
	}

	bannerPosition() {
		const windowSize = window.innerWidth;
		const container = document.querySelector(".authentication-fixed") as HTMLElement;
		const containerWidth: any = container?.offsetWidth;
		const containerLeft: any = container?.offsetLeft;
		this.fixedWidth = containerWidth;
		this.fixedLeft = containerLeft;
		console.log(this.fixedWidth, this.fixedLeft);
	}

}
