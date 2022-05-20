import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Package } from 'src/app/modules/dashboard/packages/package.class';
import { ConfigService } from '../config/config.service';

@Injectable({
	providedIn: 'root'
})
export class ApiCallService {

	constructor(private httpClient: HttpClient,
		private config: ConfigService) { }

	httpOptions = {
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

	getPackages(): Observable<Package[]> {
		const url = this.config.rootURL + "/all_packages.json";
		return this.httpClient.get<Package[]>(url)
			.pipe(
				tap(_ => this.log('fetched packages')),
				catchError(this.handleError<Package[]>('getPackages', []))
			);
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
		// this.messageService.add(`HeroService: ${message}`);
	}
}
