import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {CalendarService} from "../../../../../services/calendar.service";

@Component({
  selector: 'app-body-info-analysis',
  templateUrl: './body-info-analysis.component.html',
  styleUrls: ['./body-info-analysis.component.css'],
  providers: [CalendarService]
})
export class BodyInfoAnalysisComponent implements OnInit {

  chart = [];

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.calendarService.getEventList(new Date())
      .map((array) => {
        return array.map(r => { return { date: r.date, bodyInfo: r.bodyInfo }});
      })
      .subscribe(
        (res) => {
          console.log(res);

          const dates = res.map(r => r.date);
          const bodyInfos = res.map(r => r.bodyInfo.weight);

          this.chart = new Chart('canvas', {
            type : 'line',
            data : {
              labels : dates,
              datasets : [
                {
                  data : bodyInfos,
                  borderColor : '#3cba9f',
                  fill : false
                }
              ]
            },
            option : {
              legend : {
                display : false
              },
              scales : {
                xAxes : [{
                  display : true
                }],
                yAxes : [{
                  display : true
                }]
              }
            }
          });
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('complete');
        }
      );
  }

}
