import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateWallpaperComponent } from './create-wallpaper/create-wallpaper.component';

@Component({
	selector: 'app-wallpaper',
	templateUrl: './wallpaper.component.html',
	styleUrls: ['./wallpaper.component.scss']
})
export class WallpaperComponent implements OnInit {

	@ViewChild(CreateWallpaperComponent) createWallpaperComponent: any;
	newWallpaper: any;

	constructor() { }

	ngOnInit(): void {
	}

	/**
	 * @author Pranto
	 * @description Open wallpaper modal in mobile
	 * @description Send created wallpaper to wallpaper list component
	 */

	// Open event form in mobile
	openWallpaperForm(): void {
		this.createWallpaperComponent.isWallpaperModalMobile = true;
	}

	// Send created wallpaper from create-wallpaper component to wallpaper list component
	sendWallpaperToList(event: any): void {
		this.newWallpaper = event;
		console.log(this.newWallpaper);
	}

}
