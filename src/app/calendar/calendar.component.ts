import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  monthWeeks = [];

  headers = [
    {position: 1, text: 'Lunes'},
    {position: 2, text: 'Martes'},
    {position: 3, text: 'Miercoles'},
    {position: 4, text: 'Jueves'},
    {position: 5, text: 'Viernes'},
    {position: 6, text: 'Sabado'},
    {position: 0, text: 'Domingo'}
    ];

  constructor() { }

  ngOnInit(): void {
    this.getDaysByMonth();
  }

  getDaysByMonth() {
    let daysInMonth = moment().daysInMonth();
    const days = [];
    let week = [];
    // let monthEndDay = moment().endOf('month');
    while (daysInMonth) {
      const currentDay = moment().date(daysInMonth);
      days.push(currentDay);
      daysInMonth--;
    }

    days.reverse();
    days.forEach((day, index) => {

      if (index === 0 && day.weekday() < 6) {
        let count = day.weekday();
        while(count >= 1) {
          week.push(null);
          count --;
        }
      }

      week.push(day);

      if (day.weekday() === 6) {
        this.monthWeeks.push(week);
        week = [];
      }

      if (index == days.length -1) {
        this.monthWeeks.push(week);
      }

    });

  }

}
