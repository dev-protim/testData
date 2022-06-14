import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WallpaperComponent } from './wallpaper.component';

const routes: Routes = [
	{
		path: '',
		component: WallpaperComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WallpaperRoutingModule { }
