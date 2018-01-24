import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignService} from "../../../services/sign.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign.in.component.html',
  styleUrls: ['./sign.in.component.css']
})
export class SignInComponent implements OnInit {
  formModel : FormGroup;
  hide : boolean = true;

  constructor(private signService : SignService, private router : Router) {
    this.formModel = new FormGroup({
      id : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required)
    });
  }

  submit(){
    const { id, password } = this.formModel.value;
    console.log(id, password);
    this.signService.signIn(id, password)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
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
