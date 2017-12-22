import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign.in.component.html',
  styleUrls: ['./sign.in.component.css']
})
export class SignInComponent implements OnInit {
  formModel : FormGroup;
  hide : boolean = true;

  constructor() {
    this.formModel = new FormGroup({
      id : new FormControl(),
      password : new FormControl()
    });
  }

  submit(){
    const { id, password } = this.formModel.value;
    console.log(id, password);
  }

  ngOnInit() {
  }

}
