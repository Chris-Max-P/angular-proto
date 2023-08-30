import {MatDialog} from "@angular/material/dialog";
import {Injectable} from "@angular/core";
import {ConfirmDialogComponent} from "@global/confirm-dialog/confirm-dialog.component";
import {UtilityService} from "./utility.service";
import {ImportDialogComponent} from "@global/import-dialog/import-dialog.component";

@Injectable({providedIn: 'root' })
export class DialogService {

  constructor(private dialog: MatDialog,
              private utilityService: UtilityService) {
  }

  openConfirmDialog(title: string,
                    text: string = '',
                    confirmAction: Function = () => {},
                    confirmActionArgs: any[] = [],
                    showCancelButton = true,
                    cancelAction: Function = () => {}
                    ): void {

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: title,
        text: text,
        confirmAction: confirmAction,
        cancelAction: cancelAction,
        args: confirmActionArgs,
        showCancelButton: showCancelButton
      },
      panelClass: 'confirm-dialog'
    });
  }

  openDialog(dialogToOpen: any, data: any = {}, cssClasses: string[] = []): void {
    this.dialog.open(dialogToOpen, {
      data: data,
      panelClass: ['dialog-styles', ...cssClasses],
    });
  }

  openEditDialogWithConfirmOnClose(dialogToOpen: any, data: any) {
    let openedDialogRef = this.dialog.open(dialogToOpen, {
      panelClass: 'dialog-styles',
      disableClose: true,
      data: this.utilityService.deepCopy(data)
    });
    openedDialogRef.backdropClick().subscribe(() => {
      this.openConfirmOmitData();
    });
  }

  openConfirmOmitData() {
    this.openConfirmDialog('confirm-dialog.title.omit-data', '', this.closeAll.bind(this));
  }

  openImportDialog() {
    this.dialog.open(ImportDialogComponent, {disableClose: true});
  }

  closeAll() {
    this.dialog.closeAll();
  }
}
