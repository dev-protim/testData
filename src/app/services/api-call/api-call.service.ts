import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpResponse, HttpParams, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
// import { Business, Data, Devices } from 'src/app/modules/business/business';
import { Devices } from 'src/app/modules/business/business';
import { Package } from 'src/app/modules/dashboard/packages/package';
import { ConfigService } from '../config/config.service';
import { EventHistory } from 'src/app/modules/event/event-history/event.typing';
// throwError
// catchError
// map

@Injectable({
	providedIn: 'root'
})
export class ApiCallService {

	baseURL: string = "";
	endpoint: any = {
		"dashboard": "",
		"packageUpload": "",
		"packageUpdate": "",
		"business": "",
		"groupCreate": "",
		"groupLists": "",
		"groupUpdate": "",
		"groupDelete": "",
	}

	constructor(private httpClient: HttpClient,
		private config: ConfigService) {
			this.baseURL = this.config.baseURL;
			this.endpoint.dashboard = this.config.baseURL + "/dashboard";
			this.endpoint.packageUpload = this.config.baseURL + "/apk-upload";
			this.endpoint.packageUpdate = this.config.baseURL + "/package/update";
			this.endpoint.business = this.config.baseURL + "/business";
			this.endpoint.groupCreate = this.config.baseURL + "/device-group/create";
			this.endpoint.groupLists = this.config.baseURL + "/get-device_group";
			this.endpoint.groupUpdate = this.config.baseURL + "/device-group/update";
			this.endpoint.groupDelete = this.config.baseURL + "/device-group/delete";
		}



	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	/**
	 * @author | Pranto
	 * @description | Get all packages
	 */
	getPackages(): Observable<any> {
		return this.httpClient.get(this.endpoint.dashboard, {
			// observe: 'response'
		}).pipe(
				map(event => {
					console.log(event);
					return event;
				})
			);
	}

	// Update package information
	updateInformation(data: any) {
		return this.httpClient.post(this.endpoint.packageUpdate,  data, {
			observe: 'events'
		}).
		pipe(
			map(res => res)
		)

	}

	// Upload package path into image server
	uploadPackagePath(data: any): any {
		// const url = this.config.imageURL;
		// return this.httpClient.post(`${url}`, data, {
		// 	reportProgress: true,
		// 	observe: "events"
		// }).pipe(
		// 	map(event => event)
		// )
		return this.httpClient.post(this.endpoint.packageUpload, data, {
			reportProgress: true,
			observe: 'events'
		}).pipe(
			map(event => event)
		);

	}

	// Send uploaded file to python server
	// confirmUploadPackagePath(data: any): any {
	// 	return this.httpClient.post(this.endpoint.packageUpload, data, {
	// 		observe: 'events'
	// 	}).pipe(
	// 		map(event => event)
	// 	);
	// }

	// Get business list
	getBusiness(): Observable<any> {
		return this.httpClient.get(this.endpoint.business)
			.pipe(
				map(event => event)
				// tap(_ => this.log('fetched businesses')),
				// catchError(this.handleError<Data>('getBusinesses'))
			);
	}

	// Get device details
	getDeviceDetails(id: string) {
		const url = this.config.rootURL + "/business_info.json";
		return this.httpClient.get<Devices>(url).pipe(map((device: any) => {
			return device.data.filter((device: any) => device.business_id === id)[0];
		}))
	}

	// Get group lists
	getGroups(): Observable<any> {
		return this.httpClient.get(this.endpoint.groupLists, {
		}).pipe(
				map(list => list)
			);
	}

	// Submit group create form
	createGroup(data: any) {
		return this.httpClient.post(this.endpoint.groupCreate, data).
		pipe(
			map(res => res)
		)

	}

	// Get commands for event page form
	getCommands(): Observable<any> {
		const url = this.config.rootURL + "/event_command.json";
		return this.httpClient.get<any>(url)
			.pipe(
				tap(_ => this.log('fetched commands')),
				catchError(this.handleError<any>('getCommands'))
			);
	}

	// Get event history
	// getEventHistory(): Observable<any> | any {
	// 	const url = "https://python.uiiapi.co.uk/launcher/admin/events-history";
	// 	// let queryParams = {
	// 	// 	"start_date": "",
	// 	// 	"end_date": "",
	// 	// 	"status": "",
	// 	// 	"page_number": 0
	// 	// }
	// 	// let queryParams = new HttpParams();
	// 	// queryParams = queryParams.append("start_date", "");
	// 	// queryParams = queryParams.append("end_date", "");
	// 	// queryParams = queryParams.append("status", "");
	// 	// queryParams = queryParams.append("page_number", 0);

	// 	// return this.httpClient.get<EventHistory>(url, {params:queryParams});


	// }

	/**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {

			// TODO: send the error to remote logging infrastructure
			console.error(error); // log to console instead

			// TODO: better job of transforming error for user consumption
			this.log(`${operation} failed: ${error.message}`);

			// Let the app keep running by returning an empty result.
			return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
		console.log("From log:", message);
	}
}
