import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Scope } from '../model/scope';
import { Todo } from '../model/todo';
import { ScopeService } from '../service/scope.service';
import { StoreService } from '../service/store.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  formGroup: FormGroup;

  constructor(
    private scopeService: ScopeService,
    private formBuilder: FormBuilder,
    public storeService: StoreService
  ) { }

  ngOnInit(): void {

    this.scopeService.fetchScopes();
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      description: [null, Validators.required],
      scope: [null, Validators.required],
      date: [null, Validators.required],
      quantity: [null, Validators.required]
    });

    this.formGroup.controls['date'].patchValue(moment().format('YYYY-MM-DD'));
  }

  save(): void {
    if (this.formGroup.valid) {
      
      let todo = this.buildTodo();
      this.storeService.monthTodos.push(todo);
      
      this.storeService.month.weeks.forEach(week => {
        week.days.forEach(day => {
          if (day && day.number.toString() === moment(todo.date).format('DD')) {
            day.todos.push(todo);
            console.log(todo);
          }
        });

        this.resetFormData();
      });
    }
  }

  private resetFormData(): void {
    this.formGroup.patchValue({date: this.formGroup.get('date').value, scope: '', description: ''});
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