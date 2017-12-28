import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy} from "@angular/common";
import {appRouter} from './app.router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {SideNavComponent} from "./components/home/side-nav/side-nav.component";
import {BodyInfoComponent} from "./components/home/content/body-info/body-info.component";
import {HealthDiaryComponent} from "./components/home/content/health-diary/health-diary.component";
import {BodyAnalysisComponent} from "./components/home/content/body-analysis/body-analysis.component";
import {HomeComponent} from "./components/home/home.component";

const components = [
  AppComponent,
  HomeComponent,
  SideNavComponent,
  BodyInfoComponent,
  HealthDiaryComponent,
  BodyAnalysisComponent
];

@NgModule({
  declarations: components,
  imports: [BrowserAnimationsModule, MaterialModule, appRouter],
  providers: [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
