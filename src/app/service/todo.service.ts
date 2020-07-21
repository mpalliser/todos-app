import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { UtilsService } from './utils.service';

@Injectable()
export class TodoService {

  private readonly TODO_BASE_URL = '/life-monitoring/api/data';
  private readonly INSERT = this.TODO_BASE_URL + '/insert';

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private utilsService: UtilsService
  ) {
    this.fetchMonthTodos({ year: moment().format('YYYY'), month: moment().format('MM')});
  }

  getMonthTodos(filter: any): Observable<Todo[]> {
    return this.http.post(this.TODO_BASE_URL, filter, this.utilsService.getHeaders())
    .pipe(res => res,catchError(this.utilsService.handleError));
  }

  insertTodo(data: Todo): Observable<Todo> {
    return this.http.post(this.INSERT, data, this.utilsService.getHeaders())
    .pipe(res => res, catchError(this.utilsService.handleError));
  }

  fetchMonthTodos(filter: any): void {
    this.getMonthTodos(filter).subscribe((res: Todo[]) => {
      this.storeService.monthTodos = res,
      this.linkMonthTodosToTable();
    }, error => console.log(error)
    );
  }

  linkMonthTodosToTable(): void {
    this.storeService.monthTodos.forEach(todo => {
      this.storeService.month.weeks.forEach(week => {
        let day = week.days.find(day => 
          day.number.toString() === moment(todo.date).format('DD') && 
          day.month.toString() === moment(todo.date).format('MM')
        );
        if (day) {
          day.todos.push(todo);
          if (day.number.toString() === moment().format('DD')) {
            this.storeService.selectedDay.todos.push(todo);
          }
        }
      });
    });
  }
}