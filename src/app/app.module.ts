import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {appRouter} from './app.router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DiaryComponent} from "./components/diary/diary.component";
import {MaterialModule} from "./material.module";
import {NavComponent} from "./components/diary/nav/nav.component";
import {SidebarComponent} from "./components/diary/sidenav/sidenav.component";
import {ContentComponent} from "./components/diary/content/content.component";

@NgModule({
  declarations: [AppComponent, DiaryComponent, NavComponent, SidebarComponent, ContentComponent],
  imports: [BrowserAnimationsModule, MaterialModule, appRouter],
  providers: [{ provide : LocationStrategy, useClass : HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
