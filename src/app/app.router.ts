import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {DiaryComponent} from "./components/diary/diary.component";

const routes: Routes = [
  { path : '', redirectTo : 'diary', pathMatch : 'full' },
  { path : 'diary', component : DiaryComponent },
  { path : 'sign-in', loadChildren : 'app/components/sign/signin/sign.in.module#SignInModule' },
  { path : 'sign-up', loadChildren : 'app/components/sign/signup/sign.up.module#SignUpModule' }
];

export const appRouter : ModuleWithProviders = RouterModule.forRoot(routes);
