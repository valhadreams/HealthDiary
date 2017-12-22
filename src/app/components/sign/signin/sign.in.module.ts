import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignInComponent} from "./sign.in.component";
import {signInRouter} from "./sign.in.router";
import {MaterialModule} from "../../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports : [
    CommonModule,
    signInRouter,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations : [SignInComponent]
})
export class SignInModule{}
