import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightShiftSliderComponent } from './night-shift-slider.component';

describe('NightShiftOverlayComponent', () => {
  let component: NightShiftSliderComponent;
  let fixture: ComponentFixture<NightShiftSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightShiftSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightShiftSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
