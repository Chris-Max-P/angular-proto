import {Component, ElementRef, ViewChild} from '@angular/core';
import {NightShiftService} from "@global/night-shift/night-shift.service";

@Component({
  selector: 'night-shift-overlay',
  templateUrl: './night-shift-slider.component.html',
  styleUrls: ['./night-shift-slider.component.scss']
})
export class NightShiftSliderComponent {

  opacity: number = 0;
  @ViewChild('slider') slider!: ElementRef;

  constructor(public nightShiftService: NightShiftService) {
  }

  emitOpacityChangeEvent() {
    this.nightShiftService.opacityChange$.emit();
  }
}
