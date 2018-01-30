import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {BodyInfoComponent} from "./components/home/content/body-info/body-info.component";
import {HealthDiaryComponent} from "./components/home/content/health-diary/health-diary.component";
import {BodyAnalysisComponent} from "./components/home/content/body-analysis/body-analysis.component";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./services/auth.guard";
import {SignInComponent} from "./components/sign/signin/sign.in.component";
import {SignUpComponent} from "./components/sign/signup/sign.up.component";
import {UserInfoComponent} from "./components/home/content/user-info/user-info.component";

const routes: Routes = [
  { path : '', redirectTo : 'home', pathMatch : 'full' },
  { path : 'sign-in', component : SignInComponent, canActivate: [AuthGuard] },
  { path : 'sign-up', component : SignUpComponent, canActivate: [AuthGuard] },
  {
    path : 'home', component : HomeComponent, canActivate: [AuthGuard],
    children : [
      { path : '', component : HealthDiaryComponent },
      { path : 'body-info', component : BodyInfoComponent },
      { path : 'body-analysis', component : BodyAnalysisComponent },
      { path : 'user-info', component : UserInfoComponent }
    ]
  }
];

export const appRouter : ModuleWithProviders = RouterModule.forRoot(routes);

