import { Injectable } from '@angular/core';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { Month } from '../model/month';
import * as moment from 'moment';
import { Day } from '../model/day';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class StoreService {

  scopes: Scope[] = [];
  
  monthTodos: Todo[] = [];
  
  month: Month;

  isDaySelected: boolean;

  daySelectedObservable = new Subject();

  // TODO - Refactor number, momth year, weekday ??
  selectedDay: Day = {
    number: moment().format('DD'),
    month: moment().format('MM'),
    year: moment().format('YYYY'),
    weekDay: moment().weekday(),
    todos: []
  };

  setSelectedDay(day: any) {
    this.daySelectedObservable.next(day);
    this.isDaySelected = true;
    this.selectedDay = day;
  }

  getFirstDay(): any {
    return this.month.weeks[0].days[0];
  }

  getLastDay(): any {
    let weekLastIndex = this.month.weeks[this.month.weeks.length -1];
    return weekLastIndex.days[weekLastIndex.days.length -1];
  }
}
