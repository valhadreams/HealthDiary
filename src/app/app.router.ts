import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {BodyInfoComponent} from "./components/home/content/body-info/body-info.component";
import {HealthDiaryComponent} from "./components/home/content/health-diary/health-diary.component";
import {BodyAnalysisComponent} from "./components/home/content/body-analysis/body-analysis.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path : '', redirectTo : 'home', pathMatch : 'full' },
  {
    path : 'home', component : HomeComponent,
    children : [
      { path : '', component : HealthDiaryComponent },
      { path : 'body-info', component : BodyInfoComponent },
      { path : 'body-analysis', component : BodyAnalysisComponent }
    ]
  },
  { path : 'sign-in', loadChildren : 'app/components/sign/signin/sign.in.module#SignInModule' },
  { path : 'sign-up', loadChildren : 'app/components/sign/signup/sign.up.module#SignUpModule' }
];

export const appRouter : ModuleWithProviders = RouterModule.forRoot(routes);

