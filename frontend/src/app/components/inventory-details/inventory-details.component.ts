import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class InventoryDetailsComponent implements OnInit {
  productForm: FormGroup;
  productId: String | null = null;
  User: User | null = JSON.parse(localStorage.getItem('user') || 'null');
  
   

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (!this.User) {
      this.router.navigate(['/']);
    }
    this.productForm = this.fb.group({
      _id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.productForm.patchValue({
            _id: data._id,
            name: data.name,
            price: data.price,
            stock: data.stock,
            image: data.image
          });
        },
        error: (error) => {
          console.error('Error fetching product', error);
        }
      });
  }
}
  
  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(productData).subscribe(
          (response) => {
            console.log('Product updated successfully', response);
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error('Error updating product', error);
          }
        );
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onDelete(): void {
    if (this.productId) {
      this.productService.deleteProduct(this.productId).subscribe(
        (response) => {
          console.log('Product deleted successfully', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
}
