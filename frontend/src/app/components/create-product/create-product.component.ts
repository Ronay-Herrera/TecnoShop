import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  products: Product[] = [];
  User: User | null = JSON.parse(localStorage.getItem('user') || 'null');

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    if (!this.User) {
      this.router.navigate(['/']);
    }
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      productData._id = productData._id;

      this.productService.createProduct(productData).subscribe(
        (response) => {
          console.log('Product created successfully', response);
          this.router.navigate(['']);
        },
        (error) => {
          console.error('Error creating product', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
