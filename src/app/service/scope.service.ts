import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Scope } from '../model/scope';
import { StoreService } from './store.service';

@Injectable()
export class ScopeService {

  private readonly URI = 'http://www.mocky.io/v2/5e9d72ad3400006f006ee669';

  constructor(
    private http: HttpClient,
    private storeService: StoreService
  ) {}

  getScopes(): Observable<Scope[]> {

    return this.http.get(this.URI, this.getHeaders()).pipe(
      res => res,
      catchError(this.handleError));
  }

  fetchScopes(): void {
    this.getScopes().subscribe((res: Scope[]) =>
        this.storeService.scopes = res,
      error => console.log(error)
    );
  }

  getHeaders(): any {
    const headers = new HttpHeaders();
    headers.append('Content-TypeService', 'application/json');

    return {headers};
  }

   handleError(error: any): Promise<any> {
    return Promise.reject(error || error.message);
  }
}
