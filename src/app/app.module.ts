import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DetailComponent } from './detail/detail.component';
import { ScopeService } from './service/scope.service';
import { StoreService } from './service/store.service';
import { CalendarService } from './service/calendar.service';
import { TodoService } from './service/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    CalendarComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ScopeService,
    StoreService,
    CalendarService,
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
