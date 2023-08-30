import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NightShiftSwitchComponent} from './night-shift-switch/night-shift-switch.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {NightShiftSliderComponent} from "@global/night-shift/night-shift-slider/night-shift-slider.component";
import {MatSliderModule} from "@angular/material/slider";
import {FormsModule} from "@angular/forms";
import {NightShifterComponent} from './night-shifter.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";


@NgModule({
  declarations: [
    NightShiftSwitchComponent,
    NightShiftSliderComponent,
    NightShifterComponent
  ],
  exports: [
    NightShifterComponent
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSliderModule,
        FormsModule,
        MatSlideToggleModule
    ]
})
export class NightShiftModule { }
