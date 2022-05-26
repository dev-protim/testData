import { HttpClient, HttpHeaders, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { Business, Devices } from 'src/app/modules/dashboard/business/business';
import { Package } from 'src/app/modules/dashboard/packages/package.class';
import { ConfigService } from '../config/config.service';
// throwError
// catchError
// map

@Injectable({
	providedIn: 'root'
})
export class ApiCallService {

	url: any = "https://jsonplaceholder.typicode.com/posts";

	constructor(private httpClient: HttpClient,
		private config: ConfigService) { }

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	/**
	 * @author | Pranto
	 * @description | Get all packages
	 */
	getPackages(): Observable<Package[]> {
		const url = this.config.rootURL + "/all_packages.json";
		return this.httpClient.get<Package[]>(url)
			.pipe(
				tap(_ => this.log('fetched packages')),
				catchError(this.handleError<Package[]>('getPackages', []))
			);
	}

	/**
	 * @author | Pranto
	 * @description | Upload apk path in package list
	 */
	uploadPackagePath(formData: any, isProgressWidth: any, fileUploadMessage: any, progressStatus: any): any {
		return this.httpClient.post(`${this.url}`, formData, {
			reportProgress: true,
			observe: "events"
		})
		.pipe(map(
			(event: any) => {
				if (event.type === HttpEventType.UploadProgress) {
					isProgressWidth = Math.round(100 * event.loaded / event.total);
					// console.log(this.isProgressWidth)
				}
				else if (event.type === HttpEventType.Response) {
					isProgressWidth = 100;
				}
			}
		))
		.subscribe(
			res => {
				fileUploadMessage = "Your file is uploading...";
				progressStatus = "normal";
			},
			error => {
				fileUploadMessage = "There is an error with your file upload.";
				progressStatus = "exception";
			},
			() => {
				fileUploadMessage = "Your file uploaded successfully!";
				progressStatus = "success";
			}
		)
	}

	/**
	 * @author | Pranto
	 * @description | Get all business
	 */
	getBusiness(): Observable<Business> {
		// const url = this.config.rootURL + "/business_info.json";
		const url = "https://e837-103-113-175-2.ngrok.io/launcher/admin/business";
		return this.httpClient.get<Business>(url)
			.pipe(
				tap(_ => this.log('fetched businesses')),
				catchError(this.handleError<Business>('getBusinesses'))
			);
	}

	getDeviceDetails(id: string) {
		const url = this.config.rootURL + "/business_info.json";
		return this.httpClient.get<Devices>(url).pipe(map((device: any) => {
			return device.data.filter((device: any) => device.business_id === id)[0];
		}))
	}

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
