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
import {HttpClientModule} from "@angular/common/http";

const components = [
  AppComponent,
  HomeComponent,
  BodyInfoComponent,
  HealthDiaryComponent,
  BodyAnalysisComponent
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
  imports: modules,
  providers: [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
