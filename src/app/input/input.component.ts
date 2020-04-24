import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Scope } from '../model/scope';
import { Task } from '../model/task';
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
      scope: [null, Validators.required]
    });
  }

  save(): void {
    this.storeService.tasks.push(this.buildTask());
    console.log(this.storeService.tasks);
  }

  getSelectedScope(): Scope {
    let b = this.storeService.scopes;
    let a = this.formGroup.get('scope').value;
    return b.find(
      scope => scope.id == a);
  }

  buildTask(): Task {
    return {
      description: this.formGroup.get('description').value,
      scope: this.getSelectedScope(),
      date: moment().format('YYYY-MM-DD')
    };
  }
}
