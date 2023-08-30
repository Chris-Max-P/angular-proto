import {Component} from '@angular/core';
import {NightShiftService} from "../night-shift.service";
import {NightShiftSliderComponent} from "@global/night-shift/night-shift-slider/night-shift-slider.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'night-shift-switch',
  templateUrl: './night-shift-switch.component.html',
  styleUrls: ['./night-shift-switch.component.scss']
})
export class NightShiftSwitchComponent {

  constructor(private nightShiftService: NightShiftService,
              private dialog: MatDialog) {
  }

  openNightShiftSlider() {
    this.dialog.open(NightShiftSliderComponent, { backdropClass: 'no-dark-backdrop'});
  }
}
