import { Injectable } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import * as moment from 'moment';
import { Day } from '../model/day';
import { Month } from '../model/month';
import { Week } from '../model/week';
import { StoreService } from './store.service';
import { TodoService } from './todo.service';

@Injectable()
export class CalendarService {
	
	calendarDate: moment.Moment = moment();
	
	constructor(private storeService: StoreService, private todoService: TodoService) {
		this.fillCalendar();
	}
	
	changeMonth(nextPrevMonth: number): void {
		this.setCalendarDate(this.calendarDate.add(nextPrevMonth, 'months'));
	}
	
	getMonthText(): string {
		return this.calendarDate.locale('es').format('MMMM').toUpperCase();
	}
	
	getYear(): string {
		return this.calendarDate.format('YYYY');
	}
	
	getPrevMonthText(): string {
		let prevMonth = moment(this.calendarDate)
		
		return prevMonth.subtract(1, 'months').locale('es').format('MMMM').toUpperCase();
	}
	
	getNextMonthText(): string {
		let nextMonth = moment(this.calendarDate)
		
		return nextMonth.add(1, 'months').locale('es').format('MMMM').toUpperCase();
	}
	
	getMonth(): string {
		return this.calendarDate.format('MM');
	}
	
	fillCalendar(): void {
		
		this.clearValues();
		
		const days = this.generateDaysFromMoment(this.calendarDate);
		
		this.formatCalendarDays(days);
	}
	
	clearValues(): void {
		this.storeService.monthTodos = null;
		this.storeService.month = new Month();
	}
	
	private formatCalendarDays(days: any): void {
		
		let week: Week = new Week();
		
		days.forEach((day, index) => {
			
			if (index === 0 && day.weekday() <= 6) {
				this.fillLastMonthDays(day, week);
			}
			
			week.days.push(this.formatDay(day));
			
			if (day.weekday() === 6) {
				this.storeService.month.weeks.push(week);
				week = new Week();
			}
			
			if (index == days.length -1) {
				this.fillNextMonthDays(day, week);
				this.storeService.month.weeks.push(week);
			}
		});
	}
	
	private setCalendarDate(date: any): void {
		this.calendarDate = date;
		this.fillCalendar();
		this.todoService.fetchMonthTodos({ year: this.calendarDate.format('YYYY'), month: this.calendarDate.format('MM')});  
	}
	
	private generateDaysFromMoment(month: moment.Moment): any[] {
		
		let days = [];
		let daysInMonth = month.daysInMonth();
		
		while (daysInMonth) {
			const currentDay = moment().month(this.calendarDate.month()).date(daysInMonth);
			days.push(currentDay);
			daysInMonth--;
		}
		
		days.reverse();
		
		return days;
	}
	
	private fillNextMonthDays(day: any, week: Week): void {
		
		let days = [];
		let daysToAdd = 7 - week.days.length < 7 ? 7 - week.days.length : 0;
		let counter = 0;
		let dayToAdd = moment(this.calendarDate).add(1, 'months').startOf('month');
		
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
		let daysToAdd = day.weekday() === 0 ? 6 : day.weekday() -1;
		let counter = 0;
		let dayToAdd = moment(this.calendarDate).subtract(1, 'months').endOf('month');
		
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
			todos: [],
			dayFormatted: this.storeService.capitalize(day.locale('es').format('dddd')) + ' día ' + day.format('DD') + ' de ' + this.storeService.capitalize(day.format('MMMM')) + ' del ' + day.format('YYYY') + '.'
		};
	}
}