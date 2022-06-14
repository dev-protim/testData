import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WallpaperRoutingModule } from './wallpaper-routing.module';
import { WallpaperComponent } from './wallpaper.component';
import { CreateWallpaperComponent } from './create-wallpaper/create-wallpaper.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { WallpaperListComponent } from './wallpaper-list/wallpaper-list.component';


@NgModule({
  declarations: [
    WallpaperComponent,
    CreateWallpaperComponent,
    WallpaperListComponent
  ],
  imports: [
    CommonModule,
    WallpaperRoutingModule,
	SharedModule
  ]
})
export class WallpaperModule { }
