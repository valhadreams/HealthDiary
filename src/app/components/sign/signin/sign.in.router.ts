import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./sign.in.component";
import {ModuleWithProviders} from "@angular/core";

const routes : Routes  = [
  { path : '', component : SignInComponent },
];

export const signInRouter : ModuleWithProviders = RouterModule.forChild(routes);
