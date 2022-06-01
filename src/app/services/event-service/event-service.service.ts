import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebSocketService } from '../web-socket/web-socket.service';

@Injectable({
	providedIn: 'root'
})
export class EventServiceService {

	formData: any;

	// constructor(private webSocket: WebSocketService) {
	// 	this.formData = this.webSocket.connect().map(res => res);
	// 	// this.formData = <Subject<any>>webSocket.connect().map((response: any): any => {
	// 	// 	return response;
	// 	// })
	// }
}
