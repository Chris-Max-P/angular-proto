import {EventEmitter, Injectable} from "@angular/core";
import {AppDataService} from "@app-logic/services/app-data.service";
import {LoggerService} from "@app-logic/services/logger.service";

@Injectable({providedIn: 'root'})
export class NightShiftService {
  isDarkMode: boolean = false;

  opacity: number = 80;
  opacityChange$ = new EventEmitter();

  constructor(private appDataService: AppDataService) {
    appDataService.appDataLoaded$.subscribe(() => {
      if (appDataService.userAppData) {
        LoggerService.info("App data loaded, adapting dark mode to", appDataService.userAppData.isDarkMode);
        this.isDarkMode = appDataService.userAppData.isDarkMode;
      }
      if (this.isDarkMode) {
        document.getElementsByTagName('body')[0].classList.add('dark-mode');
      }
    });
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.getElementsByTagName('body')[0].classList.toggle('dark-mode');
    this.appDataService.setDarkMode(this.isDarkMode);
  }
}
