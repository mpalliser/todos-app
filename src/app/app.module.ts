import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    CalendarComponent
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
    TodoService,
    UtilsService,
    Globals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
