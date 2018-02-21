import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignService} from "../../../services/sign.service";
import {Router} from "@angular/router";
import {MatSpinner} from "@angular/material";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign.in.component.html',
  styleUrls: ['./sign.in.component.css']
})
export class SignInComponent implements OnInit {
  signInFormGroup : FormGroup;
  isInvalidForm = false;
  errorMessage : string;

  @ViewChild('spinner') spinner : MatSpinner;

  constructor(private signService : SignService, private router : Router) {
    this.signInFormGroup = new FormGroup({
      email : new FormControl('', Validators.email),
      password : new FormControl('', Validators.required)
    });

  }

  submit(){
    this.isInvalidForm = false;
    if(!this.signInFormGroup.valid){
      Object.keys(this.signInFormGroup.controls).forEach(field => {
        const control = this.signInFormGroup.get(field);
        control.markAsDirty({ onlySelf : true });
      });
      this.isInvalidForm = true;
      this.errorMessage = 'Invalid user data';
      return;
    }
    const { email, password } = this.signInFormGroup.value;
    this.signService.signIn(email, password)
      .subscribe(
        (res) => {
          if(res.statusCode === 200) {
            this.router.navigate(['/home/diary']);
          }
        },
        (error) => {
          console.log(error);
          this.isInvalidForm = true;
          if(error.status === 404){
            this.errorMessage = 'Server error';
          } else {
            this.errorMessage = 'Invalid user data';
          }
        },
        () => {
          console.log('sign in succeccfully');
        }
      );
  }

  isFieldValid(field: string) {
    return !this.signInFormGroup.get(field).valid && this.signInFormGroup.get(field).dirty;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field)
    };
  }

  ngOnInit() {
  }

}
