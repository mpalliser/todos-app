import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scope } from '../model/scope';
import { StoreService } from './store.service';
import { UtilsService } from './utils.service';

@Injectable()
export class ScopeService {

 	 private readonly SCOPE_BASE_URL = '/api/scope';

	constructor(
		private http: HttpClient,
		private storeService: StoreService,
		private utilsService: UtilsService
	) {}

	getScopes(): Observable<Scope[]> {

		return this.http.get(this.SCOPE_BASE_URL).pipe(
			res => res,
			catchError(this.utilsService.handleError));
	}

	fetchScopes(): void {
		this.getScopes().subscribe((res: Scope[]) =>
			this.storeService.scopes = res,
			catchError(this.utilsService.handleError)
		);
	}
}
