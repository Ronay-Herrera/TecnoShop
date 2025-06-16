import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  productsList: Product[] = []; // Definir la propiedad productsList
  orderService: OrderService = inject(OrderService);
  productService: ProductService = inject(ProductService);
  router: Router = inject(Router);
  errorMessage: any; 
  user = JSON.parse(localStorage.getItem('user') || 'null');

  ngOnInit(): void {
    if (this.user.rol == 1){
    this.loadOrdersbyUserId();
    }
    if (this.user.rol == 3 || this.user.rol == 2) {
      this.loadOrders();
    }
    this.loadProducts(); // Cargar la lista de productos al inicializar el componente
  }
  loadOrdersbyUserId(): void {
    if (this.user) {
      this.orderService.getOrdersByUserId(this.user._id).subscribe(
        (orders: Order[]) => {
          this.orders = orders;
          console.log(this.orders);
        },  
        (error) => {
          this.errorMessage = 'Error fetching orders by user ID';
          console.error('Error fetching orders by user ID', error);
        }
      );
    } else {
      console.error('User not found in local storage');
      this.errorMessage = 'User not found';
    }
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        this.errorMessage = 'Error fetching orders';
        console.error('Error fetching orders', error);
      }
    );
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.productsList = products;
      },
      (error) => {
        this.errorMessage = 'Error fetching products';
        console.error('Error fetching products', error);
      }
    );
  }

  markAsDelivered(order: Order): void {
    order.state = 'completado'; // Cambiar el estado de la orden a "completado"
    this.orderService.updateOrder(order).subscribe(
      () => {
        if (this.user.rol == 1){
          this.loadOrdersbyUserId();
          }
          if (this.user.rol == 3 || this.user.rol == 2) {
            this.loadOrders();
          }
        this.router.navigate(['/']);
      },
      (error) => {
        this.errorMessage = 'Error updating order';
        console.error('Error updating order', error);
      }
    );
  }

  cancelOrder(order: Order): void {
    if (!order._id) {
      console.error('Invalid order ID:', order._id);
      this.errorMessage = 'Invalid order ID';
      return;
    }

    // Revertir la cantidad del producto solicitado
    order.products.forEach(product => {
      const productToUpdate = this.productsList.find((p: Product) => p._id === product.productId);
      if (productToUpdate) {
        productToUpdate.stock += product.productQuantity;
        this.productService.updateProduct(productToUpdate).subscribe(
          (response) => {
            console.log('Product stock reverted successfully', response);
          },
          (error) => {
            console.error('Error reverting product stock', error);
          }
        );
      }
    });

    // Eliminar la orden
    this.orderService.deleteOrder(String(order._id)).subscribe({
      next: () => {
        if (this.user.rol == 1){
          this.loadOrdersbyUserId();
          }
          if (this.user.rol == 3 || this.user.rol == 2) {
            this.loadOrders();
          }
        this.router.navigate(['/orders']);
      },
      error: (error) => {
        this.errorMessage = 'Error deleting order';
        console.error('Error deleting order', error);
      }
    });
  }
}
