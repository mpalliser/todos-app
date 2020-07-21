import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scope } from '../model/scope';
import { StoreService } from './store.service';

@Injectable()
export class ScopeService {

  private readonly SCOPE_BASE_URL = '/life-monitoring/api/scope';

  constructor(
    private http: HttpClient,
    private storeService: StoreService
  ) {}

  getScopes(): Observable<Scope[]> {

    return this.http.get(this.SCOPE_BASE_URL, this.getHeaders()).pipe(
      res => res,
      catchError(this.handleError));
  }

  fetchScopes(): void {
    this.getScopes().subscribe((res: Scope[]) =>
        this.storeService.scopes = res,
      error => console.log(error)
    );
  }

  // TODO - extract to utilsService
  private getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-TypeService', 'application/json');

    return {headers};
  }

  // TODO - extract to utilsService
  private handleError(error: any): Promise<any> {
    return Promise.reject(error || error.message);
  }
}
