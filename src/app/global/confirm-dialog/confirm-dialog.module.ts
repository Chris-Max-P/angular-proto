import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from "@global/confirm-dialog/confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
  ]
})
export class ConfirmDialogModule { }
