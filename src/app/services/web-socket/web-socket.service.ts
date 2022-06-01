import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import * as Rx from 'rxjs/Rx';
import { io, Socket } from 'socket.io-client';
// rxjs.Rx = Rx;
// Observable

@Injectable({
	providedIn: 'root'
})
export class WebSocketService {

	socket: any;
	url: string = 'wss://e70d-103-113-175-2.ngrok.io/yolauncher';

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

	// connect(): Subject<any> {
	// 	// this.socket.on('connect', () => {
	// 	// 	// console.log('connected');
	// 	// 	console.log(this.socket.id, this.socket.connect, "socket");
	// 	// 	if (this.socket.connected) {
	// 	// 		console.log('connected');
	// 	// 	}
	// 	// });
	// 	let observable = new Observable(observer => {
	// 		this.socket.on('yolauncher_admin', (data: any) => {
	// 			observer.next(data);
	// 			console.log(data, "Receive data from server");
	// 		})
	// 		return () => {
	// 			this.socket.disconnect();
	// 		}
	// 	})

	// 	let observer = {
	// 		next: (data: Object) => {
	// 			this.socket.emit('yolauncher_admin', data);
	// 		}
	// 	}

	// 	return Subject.create(observer, observable);
	// }

	// sendData(data: object) {
	// 	let observable;
	// 	this.socket.on('connect', () => {
	// 		// console.log('connected');
	// 		// console.log(this.socket.id, this.socket.connect, "socket");
	// 		if (this.socket.connected) {
	// 			console.log('connected');
	// 			this.socket.nsp = '/yolauncher';
	// 			this.socket.emit('yolauncher_admin', data);

	// 			observable = new Observable(observer => {
	// 				this.socket.on('yolauncher_admin', (data: any) => {
	// 					observer.next(data);
	// 					console.log(data, "data");
	// 				});
	// 				// return () => {
	// 				// 	this.socket.disconnect();
	// 				// };
	// 			})
	// 		}
	// 	});
	// 	return observable;
	// 	// this.socket.on('yolauncher_admin', (data: any) => {
	// 	// 	console.log(data, "data");
	// 	// })
	// }

	ngDestroy(): void {
		this.socket.disconnect();
	}
}
