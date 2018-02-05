import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy} from "@angular/common";
import {appRouter} from './app.router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {BodyInfoComponent} from "./components/home/content/body-info/body-info.component";
import {HealthDiaryComponent} from "./components/home/content/health-diary/health-diary.component";
import {BodyAnalysisComponent} from "./components/home/content/body-analysis/body-analysis.component";
import {HomeComponent} from "./components/home/home.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./services/auth.guard";
import {SignInComponent} from "./components/sign/signin/sign.in.component";
import {SignUpComponent} from "./components/sign/signup/sign.up.component";
import {SignService} from "./services/sign.service";
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from "./services/auth.interceptor";
import {TwoButtonDialogComponent} from "./components/common/dialog/two-button-dialog/two-button-dialog.component";
import {UserInfoComponent} from "./components/home/content/user-info/user-info.component";
import {BodyInfoAnalysisComponent} from "./components/home/content/body-analysis/body-info-analysis/body-info-analysis.component";
import {ExerciseAnalysisComponent} from "./components/home/content/body-analysis/exercise-analysis/exercise-analysis.component";

const components = [
  AppComponent,
  HomeComponent,
  BodyInfoComponent,
  HealthDiaryComponent,
  BodyAnalysisComponent,
  SignInComponent,
  SignUpComponent,
  UserInfoComponent,
  BodyInfoAnalysisComponent,
  ExerciseAnalysisComponent,
  TwoButtonDialogComponent
];

const modules = [
  BrowserAnimationsModule,
  MaterialModule,
  appRouter,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule
];

@NgModule({
  declarations: components,
  entryComponents : [TwoButtonDialogComponent],
  imports: modules,
  providers: [
    { provide : LocationStrategy, useClass : HashLocationStrategy },
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true },
    AuthGuard, SignService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
