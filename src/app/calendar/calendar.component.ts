import { Component } from '@angular/core';
import { StoreService } from '../service/store.service';
import { CalendarService } from '../service/calendar.service';
import { Globals } from 'src/assets/globals';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  constructor(
    public storeService: StoreService,
    public calendarService: CalendarService,
    public globals: Globals) { }

  selectDay(day: any): void {
    this.storeService.setSelectedDay(day);
  }
}

