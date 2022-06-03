import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {

	socket: any;
	url: string = 'wss://7044-103-113-175-2.ngrok.io/yolauncher';

	constructor() {
		this.socket = io(this.url, {
			transports: ['websocket'],
			withCredentials: true,
			query: {
				device_id: 'admin',
				business_id: 'admin'
			}
		});
		console.log(this.socket, "socket");
	}

	sendMessage(data: object) {
		this.socket.emit('yolauncher_admin', data);
	}

	getMessage() {
		let observable = new Observable(observer => {
			if (this.socket.connected) {
				this.socket.on('yolauncher_admin', (data: any) => {
					observer.next(data);
					console.log(data, "data from service");
				});
			}
			return () => {
				this.socket.disconnect();
			}
		})
		return observable;
	}
}
