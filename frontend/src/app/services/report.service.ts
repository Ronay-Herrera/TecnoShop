import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  //private apiUrl = 'http://localhost:3000/Reports';
  private apiUrl = 'https://tecnoshop-q249.onrender.com/Reports';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createReport(report: Report): Observable<Report> {
    return this.http.post<Report>(this.apiUrl, report).pipe(
      catchError(this.handleError)
    );
  }

  deleteReport(_id: string|undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${_id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}