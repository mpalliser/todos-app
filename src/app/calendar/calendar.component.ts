import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { StoreService } from '../service/store.service';
import { CalendarService } from '../service/calendar.service';
import { forkJoin } from 'rxjs';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  headers = [
    {position: 1, text: 'Lunes'},
    {position: 2, text: 'Martes'},
    {position: 3, text: 'Miercoles'},
    {position: 4, text: 'Jueves'},
    {position: 5, text: 'Viernes'},
    {position: 6, text: 'Sabado'},
    {position: 0, text: 'Domingo'}
    ];

  constructor(
    public storeService: StoreService,
    private calendarService: CalendarService,
    private todoService: TodoService) { }

  ngOnInit(): void {
    
    this.calendarService.fillMonthTable();
    this.todoService.fetchMonthTodos();
  }

  getMonth(): string {
    return moment().locale('es').format('MMMM').toUpperCase();
  }


  selectDay(day: any): void {
    this.storeService.setSelectedDay(day);
  }
}
