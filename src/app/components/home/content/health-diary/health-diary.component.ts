import { Component, OnInit } from '@angular/core';
import {CalendarService, Day} from "../../../../services/calendar.service";
import {MatDialog} from "@angular/material";
import {TwoButtonDialogComponent} from "../../../common/dialog/two-button-dialog/two-button-dialog.component";

@Component({
  selector: 'app-health-diary',
  templateUrl: './health-diary.component.html',
  styleUrls: ['./health-diary.component.css'],
  providers: [CalendarService]
})
export class HealthDiaryComponent implements OnInit{
  currentDate : Date;
  currentEvents : any[];
  currentBodyInfo = {
    weight: ''
  };
  eventsInServer : any[];
  dayOfWeeks;
  days : Array<Day> = new Array();
  eventList : Array<Day>;
  minList : Array<number> = new Array();
  isSameEvent = false;

  constructor(private calendarService : CalendarService, private dialog: MatDialog){
    for(let min=5; min<=180; min=min+5){
      this.minList.push(min);
    }
    this.dayOfWeeks = this.calendarService.getDayOfWeeks();

  }

  refreshData(date: Date){
    this.calendarService.getEventList().subscribe(
      (events) => {
        // this.eventList.push(events);
        this.eventList = events;
        let thisDate = date;
        this.setCalendarData(thisDate.getFullYear(), thisDate.getMonth(), thisDate.getDate());
      },
      (err) => {
        console.log(err);
        this.eventList = [];
        let thisDate = date;
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
        events = [{what : '', time : ''}];
      }

      let isCurrentDay = false;
      if((i + 1) === date){
        isCurrentDay = true;
        this.eventsInServer = events;
        this.currentEvents = JSON.parse(JSON.stringify(events));
        this.currentBodyInfo = bodyInfo;
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
    const lastEvent = this.currentEvents[this.currentEvents.length - 1];
    if(lastEvent.event === '' || lastEvent.min === '') {
      console.log('Input event info');
      return;
    }
    this.currentEvents.push({ what : '', time : ''});
  }

  removeEvent(i: number){
    let dialog = this.dialog.open(TwoButtonDialogComponent, {
      width: '250px',
      data: {
        title: 'Alert',
        content: 'Ary really remove event?</br>You must click save button. So this Modification will save.',
        leftBtnTitle: 'No',
        rightBtnTitle: 'Ok'
      }
    });
    dialog.afterClosed().subscribe(result => {
      if(result === 'Ok'){
        this.currentEvents.splice(i, 1);
      }
    })
  }

  submit(value, isValid){
    if(!isValid)
      return;

    const bodyInfo = {
      weight: value.weight
    };

    delete value.weight;

    const events = Object.values(value);
    if(events.length === 0){
      console.log('Empty event');
    } else if(JSON.stringify(events) === JSON.stringify(this.eventsInServer)){
      this.isSameEvent = true;
    } else {
      if(this.eventsInServer[0].what === '' && this.eventsInServer[0].time === ''){
        this.calendarService.addEventOfDay(this.currentDate, events, bodyInfo)
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

  deleteAll(){
    this.calendarService.updateEventOfDay(this.currentDate, null, null)
      .subscribe((res) => {
          console.log(res);
          this.refreshData(this.currentDate);
        },
        (err) => {
          console.log(err);
        },
        () => {
          console.log('delete all event complete');
        }
      );
  }
}
