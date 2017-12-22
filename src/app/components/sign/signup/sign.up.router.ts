import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {SignUpComponent} from "./sign.up.component";

const routes : Routes  = [
  { path : '', component : SignUpComponent },
];

export const signUpRouter : ModuleWithProviders = RouterModule.forChild(routes);
