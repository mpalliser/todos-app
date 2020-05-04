import { Injectable } from '@angular/core';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { Month } from '../model/month';
import * as moment from 'moment';
import { Day } from '../model/day';

@Injectable()
export class StoreService {

  scopes: Scope[] = [];
  
  monthTodos: Todo[] = [];
  
  month: Month = new Month();

  // TODO - Refactor number, momth year, weekday ??
  selectedDay: Day = {
    number: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    weekDay: moment().weekday(),
    todos: []
  };

  setSelectedDay(day: any) {
    this.selectedDay = day;
  }

  getActualMonth(): any {
    return moment().format('MM');
  }

  getFirstDay(): any {
    return this.month.weeks[0].days[0];
  }

  getLastDay(): any {
    let weekLastIndex = this.month.weeks[this.month.weeks.length -1];
    return weekLastIndex.days[weekLastIndex.days.length -1];
  }
}
