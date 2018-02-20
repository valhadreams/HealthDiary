import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";

export class Day {
  constructor(public date : Date,
              public events : any[],
              public bodyInfo: any,
              public isCurrentDay? : boolean,
              public isEmptyEvent? : boolean){}
}

@Injectable()
export class CalendarService {
  dayOfWeeks = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];

  constructor(private http : HttpClient) { }

  getDayOfWeeks(){
    return this.dayOfWeeks;
  }

  getEventList(): Observable<any>{
    return this.http.get('/api/auth/events')
      .map((res) => {
        const result = res['result'];
        return Object.values(result);
      })
      .map(array => array.map(r => new Day(new Date(r.date), r.event, r.bodyInfo)));
  }

  // getEventOfDay(year : number, month: number, date: number){
  //
  // }
  //
  addEventOfDay(date : Date, events : any[], bodyInfo: any) : Observable<any>{
    const data = {
      "data" : {
        "date" : date,
        'bodyInfo' : bodyInfo,
        "event" : events
      }
    };
    // const data = new HttpParams()
    //   .set('date', date.toString())
    //   .set('bodyInfo', JSON.stringify(bodyInfo))
    //   .set('event', JSON.stringify(events));
    return this.http.post('/api/auth/events', data);
  }

  updateEventOfDay(date : Date, events : any[], bodyInfo: any) : Observable<any>{
    const data = {
      "data" : {
        "date" : date,
        'bodyInfo' : bodyInfo,
        "event" : events
      }
    };
    return this.http.put('/api/auth/events', data);
  }
}
