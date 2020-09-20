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
	
	private readonly TODO_BASE_URL = '/api/data';
	private readonly INSERT = this.TODO_BASE_URL + '/insert';
	private readonly STEPS_BY_MONTH = this.TODO_BASE_URL + '/month-steps';
	private readonly ACTUAL_WEIGHT = this.TODO_BASE_URL + '/actual-weight';
	
	constructor(
		private http: HttpClient,
		private storeService: StoreService,
		private utilsService: UtilsService
		) {}
		
		
	fetchInitialData(): void {
		this.fetchMonthTodos({ year: moment().format('YYYY'), month: moment().format('MM')});
		this.fetchStepsByMonth({ year: Number(moment().format('YYYY')), month: Number(moment().format('MM'))});
		this.fetchActualWeight();
	}
	
	getMonthTodos(filter: any): Observable<Todo[]> {
		filter.email = localStorage.getItem('email');
		return this.http.post(this.TODO_BASE_URL, filter)
		.pipe(res => res, catchError(this.utilsService.handleError));
	}
	
	insertTodo(data: Todo): Observable<Todo> {
		return this.http.post(this.INSERT, data)
		.pipe(res => res, catchError(this.utilsService.handleError));
	}
	
	getStepsByMonth(filter: any): Observable<number> {
		filter.email = localStorage.getItem('email');
		return this.http.post(this.STEPS_BY_MONTH, filter)
		.pipe(res => res, catchError(this.utilsService.handleError));
	}
	
	getActualWeight(): Observable<number> {
		const filter = {email: localStorage.getItem('email')};
		return this.http.post(this.ACTUAL_WEIGHT, filter)
		.pipe(res => res, catchError(this.utilsService.handleError));
	}
	
	fetchMonthTodos(filter: any): void {
		this.getMonthTodos(filter).subscribe((res: Todo[]) => {
			this.storeService.monthTodos = res;
			this.linkMonthTodosToTable();
		}, error => console.log(error)
		);
	}
		
	fetchStepsByMonth(filter: any): void {
		this.getStepsByMonth(filter).subscribe((res: number) => {
			this.storeService.stepsByMonth = Math.round(res);
		}, error => console.log(error)
		);
	}
		
	fetchActualWeight(): void {
		this.getActualWeight().subscribe((res: number) => {
			this.storeService.actualWeight = res;
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
				}
			});
		});
	}
			
	addtodoToTable(todo: Todo): void {
		
		this.storeService.monthTodos.push(todo);
		
		this.storeService.month.weeks.forEach(week => {
			let day = week.days.find(day => 
				day.number.toString() === moment(todo.date).format('DD') && 
				day.month.toString() === moment(todo.date).format('MM')
				);
				if (day) {
					day.todos.push(todo);
				}
		});
	}
}