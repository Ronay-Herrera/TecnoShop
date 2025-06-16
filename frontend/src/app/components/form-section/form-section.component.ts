import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule, ValueChangeEvent } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Order } from '../../models/order.model';
import { ProductService } from '../../services/product.service';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { Product } from '../../models/product.model';
import User from 'src/app/models/user.model';

@Component({
  selector: 'app-form-section',
  templateUrl: './form-section.component.html',
  styleUrls: ['./form-section.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class FormSectionComponent implements OnInit {
  form: FormGroup;
  productsList: Product[] = [];
  isListening = false;
  currentField: string = '';
  User: User = JSON.parse(localStorage.getItem('user') || 'null');
  nombre: string = this.User?.nombre || '';
  apellido: string = this.User?.apellido || '';
  email: string = this.User?.email || '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private voiceRecognitionService: VoiceRecognitionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required,],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      products: this.fb.array([this.createProductGroup()]),
    });
    this.form.patchValue({
      firstName: this.nombre,
      lastName: this.apellido,
      email: this.email
    })

    this.voiceRecognitionService.onResult((transcript: string) => {
      if (this.currentField) {
        this.form.patchValue({ [this.currentField]: transcript });
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.productsList = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
    console.log(this.nombre)
    console.log(this.apellido)
    console.log(this.email)
  }

  createProductGroup(): FormGroup {
    return this.fb.group({
      product: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  addProduct(): void {
    this.products.push(this.createProductGroup());
  }

  removeProduct(index: number): void {
    this.products.removeAt(index);
  }

  get products(): FormArray {
    return this.form.get('products') as FormArray;
  }

  startListening(field: string): void {
    this.currentField = field;
    this.isListening = true;
    this.voiceRecognitionService.startRecognition();
  }

  stopListening(): void {
    this.isListening = false;
    this.voiceRecognitionService.stopRecognition();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.orderService.getOrders().pipe(first()).subscribe(
        (orders: Order[]) => {
          const lastOrder = orders[orders.length - 1];
          const newOrderId = lastOrder ? Number(lastOrder.id) + 1 : 1;

          const orderData: Order = {
            id: newOrderId.toString(),
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            email: this.form.value.email,
            orderId: newOrderId.toString(),
            products: this.form.value.products.map((product: any) => ({
              productId: product.product,
              productName: this.getProductName(product.product),
              productQuantity: product.quantity
            })),
            userId: this.User._id,
            date: new Date().toISOString(),
            state: 'pendiente',
          };

          console.log('Payload being sent:', orderData); // Debug payload

          this.orderService.createOrder(orderData).subscribe(
            (response) => {
              console.log('Order created successfully', response);
              this.updateProductStock(orderData.products);
              this.router.navigate(['/home']);
            },
            (error) => {
              console.error('Error creating order', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.logValidationErrors(this.form);
    }
  }

  private logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach(key => {
      const control = group.get(key);
      if (control instanceof FormGroup) {
        this.logValidationErrors(control);
      } else {
        if (control && control.invalid) {
          console.log(`Control ${key} is invalid. Errors:`, control.errors);
        }
      }
    });
  }

  private getProductName(productId: string): string {
    const product = this.productsList.find(p => p._id === productId);
    return product ? product.name : 'Unknown Product';
  }

  private updateProductStock(products: any[]): void {
    products.forEach(product => {
      const productToUpdate = this.productsList.find(p => p._id === product.productId);
      if (productToUpdate) {
        productToUpdate.stock -= product.productQuantity;
        this.productService.updateProduct(productToUpdate).subscribe(
          (response) => {
            console.log('Product stock updated successfully', response);
          },
          (error) => {
            console.error('Error updating product stock', error);
          }
        );
      }
    });
  }
}