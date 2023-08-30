import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {ScreenNamesEnum} from "@app-logic/enums/screen-names.enum";
import {NightShiftService} from "@global/night-shift/night-shift.service";
import {DataLoggerService} from "@data-logic/services/data-logger.service";
import {Location} from "@angular/common";
import {DialogService} from "@app-logic/services/dialog.service";
import {ImportService} from "@data-logic/services/import.service";
import {JournalService} from "@data-logic/services/journal.service";

@Component({
  selector: 'man-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() showImportExport: boolean = false;
  @Input() showGoBack : boolean = true;

  constructor(public translateService: TranslateService,
              private dialogService : DialogService,
              private importService: ImportService,
              private router: Router,
              public nightShiftService: NightShiftService,
              public dataLoggerService: DataLoggerService,
              private location: Location,
              public journalService: JournalService) {
  }

  changeLang() {
    if (this.translateService.getDefaultLang() == 'de') {
      this.translateService.setDefaultLang('en');
    } else {
      this.translateService.setDefaultLang('de');
    }
  }

  goBack() {
    this.location.back()
  }

  openImportDialog() {
    this.dialogService.openImportDialog();
  }

  goToExport() {
    this.router.navigateByUrl(`/${ScreenNamesEnum.S15}`);
  }

  confirmLogout() {
    this.dialogService.openConfirmDialog('logout.confirm-question', '', this.closeApp);
  }

  closeApp() {
    window.electronAPI.closeApp()
  }
}
