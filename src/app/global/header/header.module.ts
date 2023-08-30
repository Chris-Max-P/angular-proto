import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {HeaderComponent} from "./header.component";
import {MatButtonModule} from "@angular/material/button";
import {NightShiftModule} from "@global/night-shift/night-shift.module";
import {ConfirmDialogModule} from "@global/confirm-dialog/confirm-dialog.module";
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';


@NgModule({
  declarations: [
    HeaderComponent,
    CustomTooltipComponent
  ],
  exports: [
    HeaderComponent,
    CustomTooltipComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    NightShiftModule,
    ConfirmDialogModule
  ]
})
export class HeaderModule { }
