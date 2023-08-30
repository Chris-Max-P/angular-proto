import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {S2TestCarrierSelectionComponent} from "./screens/S2-test-carrier-selection/s2-test-carrier-selection.component";
import {S3RouteInformationComponent} from "./screens/S3-route-information/s3-route-information.component";
import {S6StartingDataComponent} from "./screens/S6-starting-data/s6-starting-data.component";
import {ScreenNamesEnum} from "@app-logic/enums/screen-names.enum";
import {S1LoadingScreenComponent} from "./screens/S1-loading-screen/s1-loading-screen.component";
import {S5TestInstructionsComponent} from "./screens/S5-test-instructions/s5-test-instructions.component";

import {S4InformationComponent} from "./screens/S4-information/s4-information.component";
import {S16ViewFilesComponent} from "./screens/S16-view-files/s16-view-files.component";
import {S8DriveModeComponent} from "./screens/S8-drive-mode/s8-drive-mode.component";
import {S9InputModeComponent} from "./screens/S9-input-mode/s9-input-mode.component";
import {S11VoiceRecordingComponent} from "./screens/S11-voice-recording/s11-voice-recording.component";
import {S10ComponentSelectionComponent} from "./screens/S10-component-selection/s10-component-selection.component";
import {S13TestCasesComponent} from "./screens/S13-test-cases/s13-test-cases.component";
import {S7CaptureConsumablesComponent} from "./screens/S7-capture-consumables/s7-capture-consumables.component";
import {S12SymptomComponent} from "./screens/S12-symptom/s12-symptom.component";

const routes: Routes = [
  {
    path: '',
    component: S1LoadingScreenComponent,
    loadChildren: () => import('src/app/screens/S1-loading-screen/s1-loading-screen.module').then(m => m.S1LoadingScreenModule),
  },
  {
    path: ScreenNamesEnum.S2,
    component: S2TestCarrierSelectionComponent,
    loadChildren: () => import('src/app/screens/S2-test-carrier-selection/s2-test-carrier-selection.module').then(m => m.S2TestCarrierSelectionModule),
  },
  {
    path: ScreenNamesEnum.S3,
    component: S3RouteInformationComponent,
    loadChildren: () => import('src/app/screens/S3-route-information/s3-route-information.module').then(m => m.S3RouteInformationModule),
  },
  {
    path: ScreenNamesEnum.S4,
    component: S4InformationComponent,
    loadChildren: () => import('src/app/screens/S4-information/s4-information.module').then(m => m.S4InformationModule),
  },
  {
    path: ScreenNamesEnum.S5,
    component: S5TestInstructionsComponent,
    loadChildren: () => import('src/app/screens/S5-test-instructions/s5-test-instructions.module').then(m => m.S5TestInstructionsModule)
  },
  {
    path: ScreenNamesEnum.S6,
    component: S6StartingDataComponent,
    loadChildren: () => import('src/app/screens/S6-starting-data/s6-starting-data.module').then(m => m.S6StartingDataModule),
  },
  {
    path: ScreenNamesEnum.S7,
    component: S7CaptureConsumablesComponent,
    loadChildren: () => import('src/app/screens/S7-capture-consumables/s7-capture-consumables.module').then(m => m.S7CaptureConsumablesModule),
  },
  {
    path: ScreenNamesEnum.S8,
    component: S8DriveModeComponent,
    loadChildren: () => import('src/app/screens/S8-drive-mode/s8-drive-mode.module').then(m => m.S8DriveModeModule),
  },
  {
    path: ScreenNamesEnum.S9,
    component: S9InputModeComponent,
    loadChildren: () => import('src/app/screens/S9-input-mode/s9-input-mode.module').then(m => m.S9InputModeModule),
  },
  {
    path: ScreenNamesEnum.S10,
    component: S10ComponentSelectionComponent,
    loadChildren: () => import('src/app/screens/S10-component-selection/s10-component-selection.module').then(m => m.S10ComponentSelectionModule)
  },
  {
    path: ScreenNamesEnum.S11,
    component: S11VoiceRecordingComponent,
    loadChildren: () => import('src/app/screens/S11-voice-recording/s11-voice-recording.module').then(m => m.S11StartingDataModule),
  },
  {
    path: ScreenNamesEnum.S12,
    component: S12SymptomComponent,
    loadChildren: () => import('./screens/S12-symptom/s12-symptom.module').then(m => m.S12SymptomModule),
  },
  {
    path: ScreenNamesEnum.S12 + '/:id',
    component: S12SymptomComponent,
    loadChildren: () => import('./screens/S12-symptom/s12-symptom.module').then(m => m.S12SymptomModule),
  },
  {
    path: ScreenNamesEnum.S13,
    component: S13TestCasesComponent,
    loadChildren: () => import('src/app/screens/S13-test-cases/s13-test-cases.module').then(m => m.S13TestCasesModule)
  },
  {
    path: ScreenNamesEnum.S16,
    component: S16ViewFilesComponent,
    loadChildren: () => import('src/app/screens/S16-view-files/s16-view-files.module').then(m => m.S16ViewFilesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
