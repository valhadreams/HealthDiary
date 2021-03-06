import { Component, OnInit } from '@angular/core';
import {SignService} from "../../../services/sign.service";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'diary', title: 'Diary',  icon: 'event_note', class: '' },
    // { path: 'body-info', title: 'Body Info',  icon:'accessibility', class: '' },
    // { path: 'body-analysis', title: 'Analysis',  icon:'content_paste', class: '' },
    { path: 'user-info', title: 'User Profile',  icon:'person', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private signService: SignService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }

  logout(){
    this.signService.signOut();
  }
}
