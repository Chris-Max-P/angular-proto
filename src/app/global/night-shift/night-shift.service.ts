import {EventEmitter, Injectable} from "@angular/core";
import {LoggerService} from "@app-logic/services/logger.service";
import {UserAppData} from "@app-logic/models/user-app-config.model";

@Injectable({providedIn: 'root'})
export class NightShiftService {
  isDarkMode: boolean = false;

  opacity: number = 80;
  opacityChange$ = new EventEmitter();

  constructor() {
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.getElementsByTagName('body')[0].classList.toggle('dark-mode');
  }
}
