import {EventEmitter, Injectable} from "@angular/core";
import {LoggerService} from "@app-logic/services/logger.service";
import {FileService} from "../services/file.service";
import {TranslateService} from "@ngx-translate/core";
import {AppDataService} from "@app-logic/services/app-data.service";
import {RestService} from "@app-logic/services/rest.service";
import {TestCarrierRequest} from "@data-logic/rest-models/test-carrier-request.request";
import {I18nRequest} from "@data-logic/rest-models/i18n.request";
import {TripPurposeRequest} from "@data-logic/rest-models/trip-purpose.request";
import {RideRouteRequest} from "@data-logic/rest-models/ride-route.request";
import {RideRequest} from "@data-logic/rest-models/ride.request";
import {UsageRestrictionRequest} from "@data-logic/rest-models/usage-restriction.request";
import {LatestRideJournalsRequest} from "@data-logic/rest-models/latest-ride-journals.request";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {DatePipe} from "@angular/common";
import {UsageRestriction} from "@data-logic/models/usage-restriction.model";
import {TevisDocument} from "@data-logic/models/tevis-document.model";
import {TestCarrier} from "@data-logic/models/test-carrier.model";
import {JournalService} from "@data-logic/services/journal.service";
import {MetadataRequest} from "@data-logic/rest-models/metadata.request";
import {MetadataTypeIdsEnum} from "@data-logic/enums/metadataTypeIds.enum";
import {Metadata} from "@data-logic/models/metaData.model";
import {TestInstructionRequest} from "@data-logic/rest-models/test-instruction.request";
import {TestInstruction} from "@data-logic/models/test-instruction.model";


@Injectable({providedIn: 'root' })
export class ImportService {

  importSuccess$ = new EventEmitter();
  importError$ = new EventEmitter();
  user: string | undefined; //TODO user auth
  i18nKeys: string[] = [];

  constructor(private fileService: FileService,
              private translate: TranslateService,
              private appDataService: AppDataService,
              private restService: RestService,
              private datePipe: DatePipe,
              private journalService: JournalService) {
  }

  increaseLoadPercentage(percentageObservable: BehaviorSubject<number>, increase: number) {
    const value = percentageObservable.value + increase >= 100 ? 99 : percentageObservable.value + increase;
    percentageObservable.next(value);
  }

  async import(loadPercentageBehaviorSubject: BehaviorSubject<number>) {
    const NUMBER_OF_STEPS = 9; //amount of http requests
    const INCREASE_BY = 100 / NUMBER_OF_STEPS;
    LoggerService.info("Imported started ...");

    try {
      loadPercentageBehaviorSubject.next(0);
      //TODO catch errors
      let usageRestrictions = await this.importUsageRestrictions();
      this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY);

      let metaData = await this.importMetaData();
      const chargeLevels = metaData.filter(m => m.metadataTypeId === MetadataTypeIdsEnum.CHARGE_LEVEL);
      this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY);

      let tcData = await this.importTestCarriers(usageRestrictions, chargeLevels);
      let tcUuIds = tcData.tcUuIds;
      let testCarrierNames = tcData.testCarrierNames;
      this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY);

      await Promise.all([
        this.importRides(tcUuIds).then(() => this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY)),
        this.importLatestRideJournals(tcUuIds).then(() => this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY)),
        this.importRideRoutes().then(() => this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY)),
        this.importTripPurposes().then(() => this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY)),
        this.importTestInstructions(testCarrierNames).then(() => this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY)),
      ]);

      await this.importI18n();
      this.increaseLoadPercentage(loadPercentageBehaviorSubject, INCREASE_BY);

      loadPercentageBehaviorSubject.next(100);
      await this.appDataService.updateLastImportDate();
      this.importSuccess$.emit();

    } catch(err: any) { //TODO catch error in each import and for import error show in which exact import the error occured, also continue with other imports in case of error
      LoggerService.error("Import failed", err);
      this.importError$.emit(err);
    }

  }

  async importTestCarriers(usageRestrictions: UsageRestriction[], chargingLevels: Metadata[]) {
    let testCarrierRequest = new TestCarrierRequest();
    let testCarriersResponse = await firstValueFrom(this.restService.post(testCarrierRequest));
    LoggerService.info("Imported test-carriers from server", testCarriersResponse);
    let testCarriers: TestCarrier[] = (<any>testCarriersResponse).testCarrier;

    for (let tc of testCarriers) {
      if(tc.sbDocument) {
        this.downloadFile(tc.sbDocument);
      }
      if(this.journalService.journal.testCarrier && this.journalService.journal?.testCarrier.uuId == tc.uuId) {
        await this.journalService.set('testCarrier', tc);
      }
    }

    await this.setChargingLevels(testCarriers, chargingLevels);
    await this.setUsageRestrictions(testCarriers, usageRestrictions);

    this.fileService.writeTestCarriers(testCarriers).then(() => {
      LoggerService.info('Saved test-carriers to disk');
    });
    return {
      tcUuIds: testCarriers.map((testCarrier: any) => testCarrier.uuId),
      testCarrierNames: testCarriers.map((testCarrier: any) => testCarrier.testCarrierName)
    };
  }
  async importRides(tcUuIds: string[]) {
    let beginDateString = this.formatDateForRest(new Date());
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    let endDateString = this.formatDateForRest(endDate);
    let rideRequest = new RideRequest(tcUuIds, beginDateString, endDateString);

    let rideResponse = await firstValueFrom(this.restService.post(rideRequest));
    LoggerService.info("Imported rides from server", rideResponse);

    this.fileService.writeRides((<any>rideResponse).ride).then(() => {
      LoggerService.info('Saved rides to disk');
    });
  }

  async importLatestRideJournals(tcUuIds: string[]) {
    let latestRideJournalRequest = new LatestRideJournalsRequest(tcUuIds);

    let latestRideJournalResponse = await firstValueFrom(this.restService.post(latestRideJournalRequest));
    LoggerService.info("Imported latest-ride-journals from server", latestRideJournalResponse);

    this.fileService.writeLatestRideJournals((<any>latestRideJournalResponse).rideJournal).then(() => {
      LoggerService.info('Saved latest-ride-journals to disk');
    });
  }

  async importRideRoutes() {
    let rideRouteRequest = new RideRouteRequest();
    let rideRouteResponse = await firstValueFrom(this.restService.post(rideRouteRequest));
    LoggerService.info("Imported ride-routes from server", rideRouteResponse);

    for (let rideRoute of (<any>rideRouteResponse).rideRoutes) {
      if(rideRoute.sbDocument) {
        this.downloadFile(rideRoute.sbDocument);
      }
    }

    this.fileService.writeRideRoutes((<any>rideRouteResponse).rideRoutes).then(() => {
      LoggerService.info('Saved ride-routes to disk');
    });
  }
  async importUsageRestrictions() {
    let usageRestrictionRequest = new UsageRestrictionRequest();
    let usageRestrictionResponse = await firstValueFrom(this.restService.post(usageRestrictionRequest));
    LoggerService.info("Imported usage-restrictions from server", usageRestrictionResponse);

    let usageRestrictions = (<any>usageRestrictionResponse).usageRestrictions;
    this.i18nKeys.push(...usageRestrictions.map((usageRestriction: UsageRestriction) => usageRestriction.i18nLabel));

    await this.fileService.writeUsageRestrictions(usageRestrictions);
    LoggerService.info('Saved usage-restrictions to disk');

    return usageRestrictions as UsageRestriction[];
  }

  async importTripPurposes() {
    let tripPurposeRequest = new TripPurposeRequest();
    let tripPurposeResponse = await firstValueFrom(this.restService.post(tripPurposeRequest));
    LoggerService.info("Received trip-purposes from server", tripPurposeResponse);

    await this.fileService.writeTripPurposes((<any>tripPurposeResponse).commitments);
    LoggerService.info('Saved trip-purposes to disk');
  }

  async importMetaData() {
    let metadataRequest = new MetadataRequest();
    let metadataResponse = await firstValueFrom(this.restService.post(metadataRequest))
    LoggerService.info("Received meta-data from server", metadataResponse);

    let metadata = (<any>metadataResponse).metadata;

    for(let m of metadata) {
      if(m.i18nLabel) {
        this.i18nKeys.push(m.i18nLabel);
      }
    }
    await this.fileService.createMetadata(metadata);
    return metadata as Metadata[];
  }


  async importTestInstructions(testCarrierNames: string[]) {
    // only today + 7 days, if single: only those that are not edited by other drivers
    let beginDateString = this.formatDateForRest(new Date());
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    let endDateString = this.formatDateForRest(endDate);

    let testInstructionsRequest = new TestInstructionRequest(testCarrierNames, beginDateString, endDateString);
    let testInstructionsResponse = await firstValueFrom(this.restService.post(testInstructionsRequest));
    LoggerService.info("Received test-instructions from server", testInstructionsResponse);


    let testInstructions = (<any>testInstructionsResponse).testInstructions;
    let vehicleTestInstructionMap = new Map<string, TestInstruction[]>();
    for (let testInstruction of testInstructions) {
      for(let vehicle of testInstruction.vehicles) {
        if (!vehicleTestInstructionMap.has(vehicle.vehicleNumber)) {
          vehicleTestInstructionMap.set(vehicle.vehicleNumber, []);
        }
        vehicleTestInstructionMap.get(vehicle.vehicleNumber)?.push(this.formatTestInstruction(testInstruction, vehicle.vehicleNumber));
      }
    }
    for (let vehicleNumber of vehicleTestInstructionMap.keys()) {
      await this.fileService.writeTestInstructions(vehicleNumber, vehicleTestInstructionMap.get(vehicleNumber)!);
    }
    LoggerService.info('Saved test-instructions to disk');
  }

  formatTestInstruction(testInstruction: any, vehicleNumber: string): TestInstruction {
    const mappedTestInstruction: TestInstruction = new TestInstruction();

    mappedTestInstruction.tId = testInstruction.tid;
    mappedTestInstruction.title = testInstruction.title;
    mappedTestInstruction.description = testInstruction.description;
    mappedTestInstruction.multiple = testInstruction.multiple;
    mappedTestInstruction.testCases = testInstruction.testCases;

    for(let vehicle of testInstruction.vehicles) {
      if(vehicle.vehicleNumber == vehicleNumber) {
        mappedTestInstruction.startDate = vehicle.assignedDate.startDate;
        mappedTestInstruction.endDate = vehicle.assignedDate.endDate;
      }
    }

    //ToDo: Attachments

    return mappedTestInstruction;
  }

  async importI18n() {
    let i18nResponse = await firstValueFrom(this.restService.post(new I18nRequest(this.i18nKeys)));
    LoggerService.info("Imported i18n from server", i18nResponse);

    await this.fileService.writeI18n((<any>i18nResponse).localizedValues);
    LoggerService.info('Saved i18n to disk');

    this.appDataService.addTranslations((<any>i18nResponse).localizedValues);
  }

  async setUsageRestrictions(testCarriers: any[], usageRestrictions: UsageRestriction[]) {
    for (let tc of testCarriers) {
      if (tc.usageRestriction && tc.usageRestriction.id) {
        tc.usageRestriction = usageRestrictions.find(ur => ur.id === tc.usageRestriction.id);
      }
    }
  }

  formatDateForRest(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-ddThh:mm:ss.SSSZ')!;
  }

  getLastImportString(withPrefix: boolean) {
    let lastImportString = '';
    if (withPrefix) {
      lastImportString += this.translate.instant('import-dialog.last-import') + ': ';
    }
    if (this.appDataService.globalAppData && this.appDataService.globalAppData.lastImportDate) {
      lastImportString += this.datePipe.transform(this.appDataService.globalAppData.lastImportDate, 'dd.MM.yyyy, HH:mm');
    } else {
      lastImportString += '- ';
    }
    return lastImportString;
  }

  downloadFile(tevisFile: TevisDocument | undefined) {
    if (!tevisFile?.url) {
      LoggerService.warn('Can not download file: no url found for file', tevisFile);
      return;
    }

    this.restService.downloadFile(tevisFile.url).subscribe((blob) => {
      LoggerService.info('Downloaded file from server: ' + tevisFile.fileName, tevisFile);
      this.fileService.writeFile(tevisFile.fileName, blob).then(() => {
        LoggerService.info('Saved file to disk: ' + tevisFile.fileName, tevisFile);
      });
    });

  }

  async setChargingLevels(testCarriers: TestCarrier[], chargingLevels: Metadata[] = []) {
    for (let tc of testCarriers) {
      if(tc && tc.chargeLevel) {
        const chargeLevel = chargingLevels.find(c => c.id === tc.chargeLevel?.id);
        tc.chargeLevel.i18nLabel = chargeLevel!.i18nLabel;
      }
    }
  }

}
