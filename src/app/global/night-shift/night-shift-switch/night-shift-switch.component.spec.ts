import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NightShiftSwitchComponent } from './night-shift-switch.component';

describe('NightShiftSwitchComponent', () => {
  let component: NightShiftSwitchComponent;
  let fixture: ComponentFixture<NightShiftSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NightShiftSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NightShiftSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
