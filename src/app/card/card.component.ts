import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { ScopeService } from '../service/scope.service';
import { StoreService } from '../service/store.service';
import { TodoService } from '../service/todo.service';
import { CalendarService } from '../service/calendar.service';
import { Day } from '../model/day';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  formGroup: FormGroup;

  todos: Todo[];

  constructor(
    private scopeService: ScopeService,
    private formBuilder: FormBuilder,
    public storeService: StoreService,
    private todoService: TodoService,
    private calendarService: CalendarService
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

    this.storeService.daySelectedObservable.subscribe((data: Day) => {
      this.formGroup.controls['date'].patchValue(data.year + "-" + data.month + "-" + data.number);
    });
  }

  save(): void {
    if (this.formGroup.valid) {
      this.todoService.insertTodo(this.buildTodo()).subscribe(
        () => {
          this.storeService.isDaySelected = false;
          this.resetFormData();
          this.calendarService.fillCalendar()
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
    return scopes.find(
      scope => scope.id == selectedScopeId);
  }

  private buildTodo(): Todo {
    return {
      ...this.formGroup.value,
      scope: this.getSelectedScope()
    };
  }
}