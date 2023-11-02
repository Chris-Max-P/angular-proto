import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {S1LoadingScreenComponent} from "./screens/S1-loading-screen/s1-loading-screen.component";
const routes: Routes = [
  {
    path: '',
    component: S1LoadingScreenComponent,
    loadChildren: () => import('src/app/screens/S1-loading-screen/s1-loading-screen.module').then(m => m.S1LoadingScreenModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
