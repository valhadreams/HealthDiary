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

  setDateFormatForServer(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${year}-${month}-${day}`;
  }

  getDayOfWeeks(){
    return this.dayOfWeeks;
  }

  getEventList(date: Date): Observable<any>{
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    return this.http.get(`/api/auth/events/${year}-${month}`)
      .map((res) => {
        const result = res['data'];
        return Object.values(result);
      });
  }

  // getEventOfDay(year : number, month: number, date: number){
  //
  // }
  //
  addEventOfDay(date : Date, events : any[], bodyInfo: any) : Observable<any>{
    const data = {
      "date" : this.setDateFormatForServer(date),
      'bodyInfo' : bodyInfo,
      "event" : events
    };
    // const data = new HttpParams()
    //   .set('date', date.toString())
    //   .set('bodyInfo', JSON.stringify(bodyInfo))
    //   .set('event', JSON.stringify(events));
    return this.http.post('/api/auth/events', data);
  }

  updateEventOfDay(date : Date, events : any[], bodyInfo: any) : Observable<any>{
    const data = {
      "date" : this.setDateFormatForServer(date),
      'bodyInfo' : bodyInfo,
      "event" : events
    };
    return this.http.put('/api/auth/events', data);
  }
}
