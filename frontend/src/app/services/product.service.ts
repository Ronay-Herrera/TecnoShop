import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //private apiUrl = 'http://localhost:3000/products';
  private apiUrl = 'https://tecnoshop-q249.onrender.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(_id: String): Observable<Product> {
    const url = `${this.apiUrl}/${_id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError)
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.apiUrl}/${product._id}`;
    return this.http.put<Product>(url, product).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(_id: String): Observable<void> {
    const url = `${this.apiUrl}/${_id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  getLowStockProducts(threshold: number): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => products.filter(product => product.stock <= threshold)),
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