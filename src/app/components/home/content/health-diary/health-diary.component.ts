import { Component, OnInit } from '@angular/core';
import {CalendarService, Day} from "../../../../services/calendar.service";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.component.html',
  styleUrls: ['./health-diary.component.css'],
  providers: [CalendarService]
})
export class HealthDiaryComponent implements OnInit{
  currentDate : Date;
  currentEvents = [];
  currentBodyInfo = {
    weight: ''
  };
  eventsInServer : any[];
  dayOfWeeks;
  days : Array<Day> = new Array();
  eventList : Array<Day>;
  minList : Array<number> = new Array();
  isSameEvent = false;
  isInvalidForm = false;
  errorMessage : string;
  isEmptyEventDay: boolean;

  constructor(private calendarService : CalendarService, private dialog: MatDialog){
    for(let min=5; min<=180; min=min+5){
      this.minList.push(min);
    }
    this.dayOfWeeks = this.calendarService.getDayOfWeeks();

  }

  refreshData(date: Date){
    this.calendarService.getEventList().subscribe(
      (array) => {
        // this.eventList.push(events);
        let events = [];
        array.forEach(r => {
          const index = events.findIndex(e => {
            return e.date.toString() === new Date(r.date).toString();
          });
          if (index < 0) {
            events.push(new Day(new Date(r.date), [{what: r.what, time: r.time}], r.bodyInfo));
          } else {
            events[index].events.push({what: r.what, time: r.time});
          }
        });
        this.eventList = events;
        const thisDate = date;
        this.setCalendarData(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate());
      },
      (err) => {
        console.log(err);
        this.eventList = [];
        const thisDate = date;
        this.setCalendarData(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate());
      },
      () => {
        console.log('complete');
      }
    );
  }

  ngOnInit(){
    this.refreshData(new Date());
  }

  setCalendarData(year : number, month : number, date : number){
    this.isSameEvent = false;

    this.currentDate = new Date(year, month, date);
    this.days = new Array();
    let lastDateOfMonth = new Date(year, month + 1, 0);

    const lastDay = lastDateOfMonth.getDate();

    for(let i = 0; i < lastDay; i ++ ) {

      let tempDate = new Date(year, month, i + 1);
      let eventObj = this.eventList.find(
        (e) => {
          return (e.date.getDate() === tempDate.getDate() &&
            e.date.getMonth() === tempDate.getMonth() &&
            e.date.getFullYear() === tempDate.getFullYear());
        }
      );
      let events : Object[];
      let bodyInfo = {
        weight: ''
      };
      let isEmptyEvent = true;
      if(typeof eventObj !== 'undefined' && eventObj.events.length > 0){
        events = eventObj.events;
        bodyInfo = eventObj.bodyInfo;
        isEmptyEvent = false;
      } else {
        events = [];
      }

      let isCurrentDay = false;
      if((i + 1) === date){
        isCurrentDay = true;
        this.eventsInServer = events;
        this.currentEvents = JSON.parse(JSON.stringify(events));
        this.currentBodyInfo = bodyInfo;
        this.isEmptyEventDay = isEmptyEvent;
        if(this.currentEvents.length < 1){
          this.errorMessage = 'Click add event button';
        }
      }
      const dayObj = new Day(
        tempDate,
        events,
        bodyInfo,
        isCurrentDay,
        isEmptyEvent
      );
      if(i === 0) {
        for (let j = 0; j < dayObj.date.getDay(); j++) {
          this.days.push(new Day(null, [], false, true));
        }
      }
      this.days.push(dayObj);
      if(i === lastDay - 1) {
        for (let j = dayObj.date.getDay() + 1; j < this.dayOfWeeks.length; j++) {
          this.days.push(new Day(null, [], false, true));
        }
      }
    }
  }

  clickPrevBtn(){
    this.setCalendarData(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, this.currentDate.getDate());
  }

  clickNextBtn(){
    this.setCalendarData(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, this.currentDate.getDate());
  }

  clickAddEvent(dayObj : Day){
    this.setCalendarData(dayObj.date.getFullYear(), dayObj.date.getMonth(), dayObj.date.getDate());
  }

  clickEditEvent(dayObj : Day){
    this.setCalendarData(dayObj.date.getFullYear(), dayObj.date.getMonth(), dayObj.date.getDate());
  }

  addInputEvent(){
    if(this.currentEvents.length > 0){
      const lastEvent = this.currentEvents[this.currentEvents.length - 1];
      if(lastEvent.event === '' || lastEvent.min === '') {
        console.log('Input event info');
        return;
      }
    }

    this.currentEvents.push({ what : '', time : ''});
  }

  removeEvent(i: number){
    this.currentEvents.splice(i, 1);
    if(this.currentEvents.length < 1){
      this.errorMessage = 'Click add event button';
    }
  }

  submit(value, isValid){
    if(!isValid) {
      this.isInvalidForm = true;
      this.errorMessage = 'Enter your exercise info';
      return;
    }
    const bodyInfo = {
      weight: value.weight
    };

    delete value.weight;

    const events = Object.values(value);
    if(events.length === 0){
      console.log('Empty event');
    } else if(JSON.stringify(events) === JSON.stringify(this.eventsInServer)){
      this.isInvalidForm = true;
      this.errorMessage = 'Same with previous events';
    } else {
      if(this.isEmptyEventDay){
        this.calendarService.addEventOfDay(this.currentDate, events, bodyInfo)
          .subscribe(
            (res) => {
              console.log(res);
              this.refreshData(this.currentDate);
              this.isInvalidForm = false;
            },
            (err) => {
              console.log(err);
              this.isInvalidForm = true;
              this.errorMessage = 'Server error';
            },
            () => {
              console.log('send event complete');
            }
          );
      } else {
        this.calendarService.updateEventOfDay(this.currentDate, events, bodyInfo)
          .subscribe(
            (res) => {
              console.log(res);
              this.refreshData(this.currentDate);
            },
            (err) => {
              console.log(err);
            },
            () => {
              console.log('send event complete');
            }
          );
      }
    }
  }
}
