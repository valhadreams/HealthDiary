import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignInComponent} from "./sign.in.component";
import {signInRouter} from "./sign.in.router";
import {MaterialModule} from "../../../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SignService} from "../../../services/sign.service";

@NgModule({
  imports : [
    CommonModule,
    signInRouter,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations : [SignInComponent],
  providers : [SignService]
})
export class SignInModule{}
