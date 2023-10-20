import {Injectable} from '@angular/core';
import {environment} from "@environments/environment";

@Injectable({providedIn: 'root'})
export class LoggerService {
  private static log(message: string, logLevel: LogLevel, electronLog: boolean, optionalParams: any): void {
    if (!environment.isConsoleLoggingEnabled) return;

    // window.electronAPI.log(message, logLevel);

    let logFunction: Function | undefined;
    switch (logLevel) {
      case LogLevel.Debug:
        logFunction = console.debug;
        break;
      case LogLevel.Info:
        logFunction = console.info;
        break;
      case LogLevel.Warn:
        logFunction = console.warn;
        break;
      case LogLevel.Error:
        logFunction = console.error;
        break;
      case LogLevel.Trace:
        logFunction = console.trace;
        break;
      case LogLevel.Time:
        logFunction = console.time;
        break;
      case LogLevel.TimeEnd:
        logFunction = console.timeEnd;
        break;
      default:
        logFunction = console.log;
    }
    logFunction(message, optionalParams);
  }

  static debug(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Debug, false, optionalParams);
  }

  static info(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Info, false, optionalParams);
  }

  static warn(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Warn, false, optionalParams);
  }

  static trace(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Trace, false, optionalParams);
  }

  static error(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Error, false,  optionalParams);
  }

  static fatal(msg: string, optionalParams: any = '') {
    this.log(msg, LogLevel.Fatal, false,  optionalParams);
  }

  static time(key: string) {
    this.log(key, LogLevel.Time, false, '');
  }

  static timeEnd(key: string) {
    this.log(key, LogLevel.TimeEnd, false, '');
  }

  static electronLog(msg: string, logLevel: LogLevel) {
    this.log(msg, logLevel, true, ''); //TODO hand over opt params
  }
}

export enum LogLevel {
  Debug,
  Info,
  Warn,
  Trace,
  Error,
  Fatal,
  Time,
  TimeEnd
}
