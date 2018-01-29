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
  formModel : FormGroup;
  hide : boolean = true;
  isValidUserInfo = true;
  isShowSpinner = false;

  @ViewChild('spinner') spinner : MatSpinner;


  constructor(private signService : SignService, private router : Router) {
    this.formModel = new FormGroup({
      id : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });

  }

  submit(){
    if(!this.formModel.valid) return;
    this.isShowSpinner = true;
    const { id, password } = this.formModel.value;
    console.log(id, password);
    this.signService.signIn(id, password)
      .subscribe(
        (res) => {
          this.isShowSpinner = false;
          if(res.result) {
            localStorage.setItem('token', res.token);
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.isShowSpinner = false;
          console.log(error);
          this.isValidUserInfo = false;
        },
        () => {
          console.log('sign in succeccfully');
        }
      );
  }

  getErrorMessage(){

  }

  ngOnInit() {
  }

}
