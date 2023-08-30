import {NgModule} from "@angular/core";
import {DoneButtonComponent} from "@global/done-button/done-button.component";
import {CommonModule} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    DoneButtonComponent
  ],
  exports: [
    DoneButtonComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatButtonModule,
  ]
})
export class DoneButtonModule {

}
