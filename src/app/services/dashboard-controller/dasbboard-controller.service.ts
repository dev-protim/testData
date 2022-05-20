import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DasbboardControllerService {

	constructor() { }

	public dashboardPageHistory = new Subject<any>();

	/**
	 * @author Pranto
	 * @description Emit dashboard page history
	 */
	dashboardHistorySendMessage(message: any) {
		this.dashboardPageHistory.next(message);
	}
	dashboardHistoryGetMessage(): Observable<any> {
		return this.dashboardPageHistory.asObservable();
	}
}
