import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  titleTranslationKey: string;
  confirmAction: Function = {} as Function;
  cancelAction: Function = {} as Function;
  functionArgs: [];
  text = '';
  showCancelButton = true;

  constructor(@Inject(MAT_DIALOG_DATA) data: {
        title: string,
        text: string,
        confirmAction: Function,
        args: [],
        cancelAction: Function,
        showCancelButton: boolean
      }) {
    this.titleTranslationKey = data.title;
    this.text = data.text;
    this.confirmAction = data.confirmAction;
    this.cancelAction = data.cancelAction;
    this.functionArgs = data.args;
    this.showCancelButton = data.showCancelButton;
  }

  ngOnInit(): void {
  }

  onConfirm() {
    this.confirmAction(...this.functionArgs);
  }

  onCancel() {
    if(this.cancelAction)
      this.cancelAction();
  }

}
