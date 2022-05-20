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
	phoneNumber: any;
	isEmail: boolean = true;
	isPhone: boolean = false;
	istextView: boolean = false;

	constructor() { }

	ngOnInit(): void {
		this.bannerPosition();
	}

	/**
	 * @author | Pranto Protim Roy
	 * @description Get banner position according to screen resize
	 */
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

	/**
	 * @author | Pranto Protim Roy
	 * @description Authentication medium change event
	 */
	changeAuthMedium(medium: string): void {
		if (medium === 'email') {
			this.isEmail = true;
			this.isPhone = false;
		} else {
			this.isEmail = false;
			this.isPhone = true;
		}
	}

	/**
	 * @author | Pranto Protim Roy
	 * @description Toggle password view
	 */
	togglePasswordView(): void {
		const password: any = document.querySelector("input.password") as HTMLElement;
		// const eye = document.querySelector(".eye") as HTMLElement;
		if (password.type === 'password') {
			password.type = 'text';
			this.istextView = true;
		} else {
			password.type = 'password';
			this.istextView = false;
		}
	}

}
