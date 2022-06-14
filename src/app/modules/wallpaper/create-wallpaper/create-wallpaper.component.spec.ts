import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWallpaperComponent } from './create-wallpaper.component';

describe('CreateWallpaperComponent', () => {
  let component: CreateWallpaperComponent;
  let fixture: ComponentFixture<CreateWallpaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWallpaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
