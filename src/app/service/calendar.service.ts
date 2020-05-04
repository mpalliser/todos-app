import { Injectable } from '@angular/core';
import { Week } from '../model/week';
import { StoreService } from './store.service';
import * as moment from 'moment';
import { Day } from '../model/day';

@Injectable()
export class CalendarService {

  constructor(private storeService: StoreService) {
  }

  fillMonthTable(): void {
  
    let week: Week = new Week();
    const days = this.generateDaysFromMoment();

    days.forEach((day, index) => {

      if (index === 0 && day.weekday() < 6) {
        this.fillLastMonthDays(day, week);
      }

      week.days.push(this.formatDay(day));

      if (day.weekday() === 0) {
        this.storeService.month.weeks.push(week);
        week = new Week();
      }

      if (index == days.length -1) {
        this.fillNextMonthDays(day, week);
        this.storeService.month.weeks.push(week);
      }
    });
  }
    
  private generateDaysFromMoment(): any[] {

    let days = [];
    let daysInMonth = moment().daysInMonth();
    
    while (daysInMonth) {
      const currentDay = moment().date(daysInMonth);
      days.push(currentDay);
      daysInMonth--;
    }

    days.reverse();

    return days;
  }
    
  private fillNextMonthDays(day: any, week: Week): void {

    let days = [];
    let daysToAdd = day.weekday() - 1;
    let counter = 0;
    let dayToAdd = moment(day).add(1, 'months').startOf('month');

    while (daysToAdd > counter) {
      if (counter >= 1) {
        dayToAdd.add(1, 'days');
      }
      days.push(this.formatDay(dayToAdd));
      counter++;
    }

    week.days = week.days.concat(days);
  }
    
  private fillLastMonthDays(day: any, week: Week): void {

    let days = [];
    let daysToAdd = day.weekday() -1;
    let counter = 0;
    let dayToAdd = moment(day).subtract(1, 'months').endOf('month');

    while (daysToAdd > counter) {
      if (counter >= 1) {
        dayToAdd.subtract(1, 'days');
      }
      days.push(this.formatDay(dayToAdd));
      counter++;
    }
    days.reverse();
    week.days = days.concat(week.days);
  }
    
  private formatDay(day: any): Day {
    return {
      number: day.format('DD'),
      month: day.format('MM'),
      year: day.format('YYYY'),
      weekDay: day.weekday(),
      todos: []
    };
  }
}