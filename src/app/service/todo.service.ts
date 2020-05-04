import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoreService } from './store.service';
import { Observable } from 'rxjs';
import { Todo } from '../model/todo';
import { catchError } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable()
export class TodoService {

  private readonly URI = 'http://www.mocky.io/v2/5eaf03a23300004b009f42cf';

  constructor(
    private http: HttpClient,
    private storeService: StoreService
  ) {}

  getMonthTodos(): Observable<Todo[]> {
    return this.http.get(this.URI, this.getHeaders()).pipe(
      res => res,
      catchError(this.handleError));
  }

  fetchMonthTodos(): void {
    this.getMonthTodos().subscribe((res: Todo[]) => {
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

  // TODO - extract to utilsService
   private getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-TypeService', 'application/json');

    return {headers};
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error || error.message);
  }
}