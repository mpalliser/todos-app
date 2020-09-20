import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { ScopeService } from '../service/scope.service';
import { StoreService } from '../service/store.service';
import { TodoService } from '../service/todo.service';
import { Day } from '../model/day';
import * as moment from 'moment';
import { UtilsService } from '../service/utils.service';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

	formGroup: FormGroup;

	constructor(
		private scopeService: ScopeService,
		private formBuilder: FormBuilder,
		public storeService: StoreService,
		private todoService: TodoService,
		public utilsService: UtilsService
	) { }

	ngOnInit(): void {

		this.scopeService.fetchScopes();
		this.initForm();
	}

	initForm(): void {
		this.formGroup = this.formBuilder.group({
			scope: [null, Validators.required],
			date: [null, Validators.required],
			quantity: [null, Validators.required]
		});

		this.formGroup.controls['date'].patchValue(
			this.storeService.getSelectedDay()?.year + "-" + 
			this.storeService.getSelectedDay()?.month + "-" + 
			this.storeService.getSelectedDay()?.number
		);

	}

	save(): void {
		if (this.formGroup.valid) {
			this.todoService.insertTodo(this.buildTodo()).subscribe(
				(todo: Todo) => {
					this.todoService.addtodoToTable(todo);
					this.storeService.isDaySelected = false;
					this.todoService.fetchActualWeight();
					this.todoService.fetchStepsByMonth({ year: Number(moment().format('YYYY')), month: Number(moment().format('MM'))});
					this.resetFormData();
				}, err => console.log(err)
			)
		}
	}

	private resetFormData(): void {
		this.formGroup.patchValue({date: this.formGroup.get('date').value, scope: null, quantity: null});
	}

	private getSelectedScope(): Scope {
		
		let scopes = this.storeService.scopes;
		let selectedScopeId = this.formGroup.get('scope').value;
		
		return scopes.find(scope => scope.id == selectedScopeId);
	}

	private buildTodo(): Todo {
		return {...this.formGroup.value,scope: this.getSelectedScope(), userEmail: localStorage.getItem('email')};
	}
}