import { Injectable } from '@angular/core';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { Month } from '../model/month';
import { Subject } from 'rxjs';
import { Day } from '../model/day';
import { SocialUser } from 'angularx-social-login';

@Injectable()
export class StoreService {
	
	scopes: Scope[] = [];
	
	monthTodos: Todo[] = [];
	
	month: Month;
	
	stepsByMonth: number;
	
	actualWeight: number;
	
	isDaySelected: boolean;
	
	selectedDayObservable = new Subject<Day>();
	
	selectedDay: Day;
	
	user: SocialUser;
	
	capitalize(string: any): string {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
	setSelectedDay(day: Day) {
		this.selectedDay = day;
		this.isDaySelected = true;
	}

	getSelectedDay(): Day {
		return this.selectedDay;
	}
	
	selectedDaySubscriber(): void {
		this.selectedDayObservable.subscribe(data => this.selectedDay = data); 
	}
	
	getFirstDay(): any {
		return this.month.weeks[0].days[0];
	}
	
	getLastDay(): any {
		let weekLastIndex = this.month.weeks[this.month.weeks.length -1];
		return weekLastIndex.days[weekLastIndex.days.length -1];
	}

	clearData(): void {

		localStorage.clear();
		this.user = null;
		this.monthTodos = [];
		this.month.weeks.forEach(week => week.days.forEach(day => day.todos = []));
		this.stepsByMonth = 0;
		this.actualWeight = 0
	}
}
