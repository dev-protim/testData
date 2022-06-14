import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperListComponent } from './wallpaper-list.component';

describe('WallpaperListComponent', () => {
  let component: WallpaperListComponent;
  let fixture: ComponentFixture<WallpaperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallpaperListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
