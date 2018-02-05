import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body-analysis',
  templateUrl: './body-analysis.component.html',
  styleUrls: ['./body-analysis.component.css']
})
export class BodyAnalysisComponent implements OnInit {

  tabs : Array<any> = [
    { title : "How much it has changed" , link : "./body-info" },
    { title : "How did you exercise" , link : "./exercise" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
