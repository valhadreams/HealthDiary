import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignService, SignUpObj} from "../../../services/sign.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpformGroup: FormGroup;
  isInvalidForm = false;
  errorMessage : string;

  constructor(private signService : SignService, private router : Router) {
    this.signUpformGroup = new FormGroup({
      email : new FormControl('', Validators.email),
      nickname : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      gender : new FormControl('', Validators.required),
      height : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required)
    });
  }

  submit(){
    if(!this.signUpformGroup.valid) {
      Object.keys(this.signUpformGroup.controls).forEach(field => {
        const control = this.signUpformGroup.get(field);
        control.markAsDirty({ onlySelf : true });
      });
      this.isInvalidForm = true;
      this.errorMessage = 'Invalid user data';
      return;
    }

    const { email, nickname, password, gender, height, weight } = this.signUpformGroup.value;
    const signInfo = new SignUpObj(email, password, nickname, gender, height, weight);
    this.signService.signUp(signInfo)
      .subscribe(
        (res) => {
          if(res.statusCode === 200)
            this.router.navigate(['/sign-in']);
        },
        error => {
          this.isInvalidForm = true;
          if(error.status === 409){ // duplicate id
            this.errorMessage = 'Duplicate user email';
          } else if(error.status === 404){
            this.errorMessage = 'Server error';
          }
          console.log('post error : ', error);
        },
        () => {
          console.log('post complete');
        }
      );
  }

  isFieldValid(field: string) {
    return !this.signUpformGroup.get(field).valid && this.signUpformGroup.get(field).dirty;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  ngOnInit() {
  }

}
