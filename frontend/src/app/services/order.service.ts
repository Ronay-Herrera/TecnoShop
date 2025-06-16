import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order).pipe(
      catchError(this.handleError)
    );
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getOrdersByUserId(userId: String): Observable<Order[]> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<Order[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.apiUrl}/${order._id}`;
    return this.http.put<Order>(url, order).pipe(
      catchError(this.handleError)
    );
  }

  deleteOrder(orderId: string): Observable<void> {
    const url = `${this.apiUrl}/${orderId}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
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
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(_id: string): Observable<Product> {
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

  deleteProduct(_id: string): Observable<void> {
    const url = `${this.apiUrl}/${_id}`;
    return this.http.delete<void>(url).pipe(
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