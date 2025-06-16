import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class NotificationsComponent implements OnInit {
  lowStockProducts: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getLowStockProducts(10).subscribe(
      (products: Product[]) => {
        this.lowStockProducts = products;
      },
      (error) => {
        console.error('Error fetching low stock products', error);
      }
    );
  }
}
