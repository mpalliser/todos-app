import { Component, OnInit, HostListener } from '@angular/core';
import { StoreService } from '../service/store.service';
import { CalendarService } from '../service/calendar.service';
import { Globals } from 'src/assets/globals';
import { Day } from '../model/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  innerWidth: number;

  constructor(
    public storeService: StoreService,
    public calendarService: CalendarService,
    public globals: Globals) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  setSelectedDay(day: Day): void {
    this.storeService.setSelectedDay(day);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
}
}

