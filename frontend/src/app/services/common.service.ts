import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  // Example method to log messages
  log(message: string): void {
    console.log(`CommonService: ${message}`);
  }

  // Example method to handle HTTP errors
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  // Example method to fetch data from an API
  fetchData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl).pipe(
      catchError(this.handleError)
    );
  }
}
