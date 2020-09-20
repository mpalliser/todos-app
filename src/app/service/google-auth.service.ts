import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StoreService } from './store.service';
import { TodoService } from './todo.service';


@Injectable()
export class GoogleAuthService {

    private readonly LOGIN_URL = '/api/google';


    constructor(
        private googleAuthService: SocialAuthService,
        private todoService: TodoService,
        private http: HttpClient,
        private storeService: StoreService) { }

    signIn(): void {
        this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(resG => {
            
            this.storeService.user = resG;
    
            this.login(this.storeService.user).subscribe(res => {
                
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('name', res.name);
                localStorage.setItem('photoUrl', resG.photoUrl);
                localStorage.setItem('email', res.email);
                localStorage.setItem('refreshToken', res.refreshToken);

                this.todoService.fetchInitialData();
            },err => catchError);
        }).catch(catchError);
    }

    mockSignIn(): void {
    
        localStorage.setItem('accessToken', '');
        localStorage.setItem('name', 'test');
        localStorage.setItem('email', 'mmm.palliser@gmail.com');
        localStorage.setItem('refreshToken', '');

        this.todoService.fetchInitialData();
    }

    setUserFromLocalStore(): void {

        let user: SocialUser = new SocialUser();
  
        user.authToken = localStorage.getItem('accessToken');
        user.email = localStorage.getItem('email');
        user.name = localStorage.getItem('name');
        user.photoUrl = localStorage.getItem('photoUrl');
        
        this.storeService.user = user;
    }

    login(user: SocialUser): Observable<any> {
        return this.http.post(this.LOGIN_URL, user).pipe(res => res, catchError(catchError));
    }

    logOut(): void {
        this.storeService.clearData();
    }
}