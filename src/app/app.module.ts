import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ScopeService } from './service/scope.service';
import { StoreService } from './service/store.service';
import { CalendarService } from './service/calendar.service';
import { TodoService } from './service/todo.service';
import { UtilsService } from './service/utils.service';
import { Globals } from 'src/assets/globals';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider  } from "angularx-social-login";
import { NavbarComponent } from './navbar/navbar.component';
import { GoogleAuthService } from './service/google-auth.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CalendarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    ScopeService,
    StoreService,
    CalendarService,
    TodoService,
    UtilsService,
    Globals,
    GoogleAuthService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '829105985914-6o6fpb4dmcf8h2i5r6ofm47und2tjsni.apps.googleusercontent.com'
            ),
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
