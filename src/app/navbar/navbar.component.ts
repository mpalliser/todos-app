import { Component } from '@angular/core';
import { SocialUser } from 'angularx-social-login';
import { CalendarService } from '../service/calendar.service';
import { GoogleAuthService } from '../service/google-auth.service';
import { StoreService } from '../service/store.service';
import { TodoService } from '../service/todo.service';
import { UtilsService } from '../service/utils.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

	loggedIn: boolean;

	constructor(
		private calendarService: CalendarService,
		private googleAuthService: GoogleAuthService,
		private utilsService: UtilsService,
		private todoService: TodoService,
		private storeService: StoreService
	) {
		if (this.utilsService.isUserLogedIn()) {
			this.googleAuthService.setUserFromLocalStore();
			this.todoService.fetchInitialData();
		}
	}

	get year(): string {
		return this.calendarService.getYear();
	}

	get user(): SocialUser {
		return this.storeService.user;
	}
	
	singIn(): void {
		this.googleAuthService.signIn();
	}

	logOut(): void {
		this.googleAuthService.logOut();
	}
}
