import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from '../notifications/notifications.component';
import { ReportComponent } from '../reports/reports.component';
import { NavVarComponent } from '../nav-var/nav-var.component';
import { FormSectionComponent } from '../form-section/form-section.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { OrdersComponent } from "../orders/orders.component";
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, NotificationsComponent, ReportComponent, NavVarComponent, FormSectionComponent, InventoryComponent, OrdersComponent]
})
export class HomeComponent {
  User: User | null = JSON.parse(localStorage.getItem('user') || 'null');
  rol: Number = this.User?.rol || 0;
  isOpen: { [key: string]: boolean } = {}; // Objeto para rastrear el estado de cada sección

  toggleDropdown(section: string) {
    // Alterna el estado de la sección específica
    this.isOpen[section] = !this.isOpen[section];
  }

  constructor(private router: Router) {
    if (!this.User) {
      this.router.navigate(['/']);
    }
  }
}
