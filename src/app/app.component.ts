import { Component } from '@angular/core';import { StoreService } from './service/store.service';
import { UtilsService } from './service/utils.service';
;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(
		public storeService: StoreService,
		public utilsService: UtilsService) {}
}