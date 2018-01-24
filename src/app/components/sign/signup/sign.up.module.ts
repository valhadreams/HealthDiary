import {signUpRouter} from "./sign.up.router";
import {SignUpComponent} from "./sign.up.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {SignService} from "../../../services/sign.service";

@NgModule({
  imports : [
    CommonModule,
    signUpRouter,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations : [SignUpComponent],
  providers : [SignService]
})
export class SignUpModule{}
