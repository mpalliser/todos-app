import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class UtilsService {
    
    public getHeaders(): any {
        const headers = new HttpHeaders();
        headers.append('Content-TypeService', 'application/json');
    
        return {headers};
      }
    
      public handleError(error: any): Promise<any> {
        return Promise.reject(error || error.message);
      }
}