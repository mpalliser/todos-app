import { Injectable } from '@angular/core';
import { Scope } from '../model/scope';
import { Task } from '../model/task';

@Injectable()
export class StoreService {

  scopes: Scope[] = [];

  tasks: Task[] = [];
}
