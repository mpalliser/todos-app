import { Injectable } from '@angular/core';
import { ApiError } from '../model/api-error';
import { StoreService } from './store.service';

@Injectable()
export class UtilsService {

	// private readonly JWT_EXPIRED = 'JWT expired at';

	constructor(private storeService: StoreService) {}

	handleError(error: ApiError): Promise<any> {

		// if (error.message.includes(this.JWT_EXPIRED)) {
		// 	localStorage.clear();
		// 	this.storeService.user = null;
		// }

		return Promise.reject(error || error.message);
	}

	isUserLogedIn(): boolean {

		if (localStorage.getItem('accessToken') && localStorage.getItem('email')) {
			return true;
		}
	}
}