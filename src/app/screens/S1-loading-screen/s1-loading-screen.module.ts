import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {S1LoadingScreenComponent} from "./s1-loading-screen.component";
import { TestModule } from 'new-lib';

@NgModule({
  declarations: [
    S1LoadingScreenComponent
  ],
  imports: [
    CommonModule,
    TestModule,
  ]
})
export class S1LoadingScreenModule { }
