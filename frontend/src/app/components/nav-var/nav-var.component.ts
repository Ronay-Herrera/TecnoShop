import { Component } from '@angular/core';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-nav-var',
  imports: [],
  templateUrl: './nav-var.component.html',
  styleUrl: './nav-var.component.css'
})
export class NavVarComponent {
  User: User | null = JSON.parse(localStorage.getItem('user') || 'null');
  rol: Number = this.User?.rol || 0;

  logout(): void {
    localStorage.removeItem('user');
    this.User = null;
    this.rol = 0;
    window.location.href = '/';
  }
}
