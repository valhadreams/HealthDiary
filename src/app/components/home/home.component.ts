import {Component, OnDestroy} from '@angular/core';
import {SignService} from "../../services/sign.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  menus : Array<any> = [
    { title : "Health Diary" , link : "" },
    { title : "Body Info" , link : "./body-info" },
    { title : "Body Analysis" , link : "./body-analysis" },
    { title : "User Info" , link : "./user-info" }
  ];

  constructor() {

  }

  ngOnDestroy(): void {

  }

}
