import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService { 

  POST_URL = 'http://localhost:3000/Login';


  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<User>(this.POST_URL, { email, password });
  }
}
