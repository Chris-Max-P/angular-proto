import {Component, ElementRef, ViewChild} from '@angular/core';
import {NightShiftService} from "@global/night-shift/night-shift.service";

@Component({
  selector: 'night-shifter',
  templateUrl: './night-shifter.component.html',
  styleUrls: ['./night-shifter.component.scss']
})
export class NightShifterComponent {

  constructor(private nightShiftService: NightShiftService) {
  }

  @ViewChild('overlay') overlay!: ElementRef;

  ngOnInit() {
    this.nightShiftService.opacityChange$.subscribe(() => {
      this.adaptOpacity();
    })
  }

  adaptOpacity() {
    this.overlay.nativeElement.style.opacity = (80 - this.nightShiftService.opacity) + '%';
  }
}
