````markdown
# Documentación del Proyecto TecnoShop

## Tabla de Contenidos

- [Introducción](#introducción)
- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Uso](#uso)
- [API del Backend](#api-del-backend)
  - [Usuarios](#usuarios)
  - [Productos](#productos)
  - [Pedidos](#pedidos)
- [Componentes del Frontend](#componentes-del-frontend)
  - [FormSectionComponent](#formsectioncomponent)
  - [InventoryDetailsComponent](#inventorydetailscomponent)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Introducción

El proyecto TecnoShop es una aplicación full-stack diseñada para gestionar pedidos e inventarios. Consiste en un frontend construido con Angular y un backend construido con Node.js y Express. La aplicación proporciona funcionalidades para crear, actualizar y eliminar pedidos y productos, así como gestionar inventarios.

## Características

- Autenticación y autorización de usuarios
- Operaciones CRUD para usuarios, productos y pedidos
- Endpoints de API seguros
- Validación de datos y manejo de errores
- Reconocimiento de voz para la entrada de formularios
- Actualizaciones de stock en tiempo real

## Estructura del Proyecto

### Frontend

```
.angular/
	cache/
		19.1.5/
			...
angular.json
db.json
package.json
README.md
src/
	.angular/
		cache/
	app/
		app.component.css
		...
	assets/
		...
	favicon.ico
	index.html
	main.ts
	styles.css
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

### Backend

```
.env
package.json
README.md
src/
	.env
	app.js
	controllers/
		ordersController.js
	db.js
	db.json
	models/
		orderModel.js
	routes/
		ordersRoute.js
	server.js
```

## Instalación

Para comenzar con el proyecto TecnoShop, sigue estos pasos:

### Backend

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/yourusername/TecnoShop.git
    cd TecnoShop/backend
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Configurar variables de entorno:**

    Crea un archivo `.env` en el directorio raíz y agrega las variables de entorno necesarias. Consulta `.env.example` para las variables requeridas.

4. **Ejecutar la aplicación:**

    ```bash
    npm start
    ```

    Para ejecutar el servidor JSON para datos ficticios:

    ```bash
    npm run start:json-server
    ```

### Frontend

1. **Navegar al directorio del frontend:**

    ```bash
    cd ../frontend
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Ejecutar la aplicación:**

    ```bash
    ng serve
    ```

    La aplicación se ejecutará en `http://localhost:4200` por defecto.

## Uso

Después de configurar el proyecto, puedes iniciar el servidor y acceder a los endpoints de la API. El servidor backend se ejecutará en `http://localhost:3000` por defecto, y la aplicación frontend se ejecutará en `http://localhost:4200`.

## API del Backend

### Usuarios

#### Obtener todos los usuarios

- **Endpoint:** users
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los usuarios.

#### Crear un nuevo usuario

- **Endpoint:** users
- **Método:** `POST`
- **Descripción:** Crea un nuevo usuario.
- **Cuerpo de la solicitud:**
  ```json
  {
    "name": "Nombre del usuario",
    "email": "Correo del usuario",
    "password": "Contraseña del usuario"
  }
  ```

### Productos

#### Obtener todos los productos

- **Endpoint:** `/products`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los productos.

#### Crear un nuevo producto

- **Endpoint:** `/products`
- **Método:** `POST`
- **Descripción:** Crea un nuevo producto.
- **Cuerpo de la solicitud:**
  ```json
  {
    "name": "Nombre del producto",
    "price": "Precio del producto",
    "stock": "Cantidad en inventario",
    "image": "URL de la imagen del producto"
  }
  ```

### Pedidos

#### Obtener todos los pedidos

- **Endpoint:** `/orders`
- **Método:** `GET`
- **Descripción:** Obtiene una lista de todos los pedidos.

#### Crear un nuevo pedido

- **Endpoint:** `/orders`
- **Método:** `POST`
- **Descripción:** Crea un nuevo pedido.
- **Cuerpo de la solicitud:**
  ```json
  {
    "firstName": "Nombre del cliente",
    "lastName": "Apellido del cliente",
    "email": "Correo del cliente",
    "products": [
      {
        "productId": "ID del producto",
        "quantity": "Cantidad del producto"
      }
    ]
  }
  ```

## Componentes del Frontend

### FormSectionComponent

#### Descripción

El componente `FormSectionComponent` se utiliza para gestionar la entrada de pedidos. Permite a los usuarios agregar productos a un pedido, eliminar productos y enviar el pedido.

#### Código

##### `form-section.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';
import { VoiceRecognitionService } from '../../services/voice-recognition.service';
import { Router } from '@angular/router';
import { first } from 'rxjs';

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

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private productService: ProductService,
    private voiceRecognitionService: VoiceRecognitionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      orderId: ['', Validators.required],
      products: this.fb.array([this.createProductGroup()]),
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

    this.orderService.getOrders().pipe(first()).subscribe(
      (orders: Order[]) => {
        const lastOrder = orders[orders.length - 1];
        const newOrderId = lastOrder ? Number(lastOrder.id) + 1 : 1;
        this.form.patchValue({ orderId: newOrderId.toString() });
      },
      (error) => {
        console.error('Error fetching orders', error);
      }
    );
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
      const orderData: Order = {
        id: this.form.value.orderId,
        firstName: this.form.value.firstName,
        lastName: this.form.value.lastName,
        email: this.form.value.email,
        orderId: this.form.value.orderId,
        products: this.form.value.products.map((product: any) => ({
          productId: product.product,
          productName: this.getProductName(product.product),
          productQuantity: product.quantity
        })),
        userId: 'some-user-id', // Puedes ajustar esto según tus necesidades
        date: new Date().toISOString(),
        state: 'pendiente'
      };

      this.orderService.createOrder(orderData).subscribe(
        (response) => {
          console.log('Order created successfully', response);
          this.updateProductStock(orderData.products);
        },
        (error) => {
          console.error('Error creating order', error);
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
    const product = this.productsList.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
  }

  private updateProductStock(products: any[]): void {
    products.forEach(product => {
      const productToUpdate = this.productsList.find(p => p.id === product.productId);
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
```

##### `form-section.component.html`

```html
<form [formGroup]="form" (submit)="onSubmit()">
    <div class="form-group">
        <label for="first-name">Nombre</label>
        <input type="text" id="first-name" formControlName="firstName" required>
        <button type="button" (click)="startListening('firstName')" *ngIf="!isListening">🎤</button>
        <button type="button" (click)="stopListening()" *ngIf="isListening">🛑</button>
    </div>
    <div class="form-group">
        <label for="last-name">Apellido</label>
        <input type="text" id="last-name" formControlName="lastName" required>
        <button type="button" (click)="startListening('lastName')" *ngIf="!isListening">🎤</button>
        <button type="button" (click)="stopListening()" *ngIf="isListening">🛑</button>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" formControlName="email" required>
    </div>
    <div class="form-group">
        <label for="order-id">ID del Pedido</label>
        <input type="text" id="order-id" formControlName="orderId" required>
    </div>
    <div formArrayName="products">
        <table class="products-table">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let product of products.controls; let i = index" [formGroupName]="i">
                    <td>
                        <select id="product" formControlName="product" required title="Seleccione un producto">
                            <option *ngFor="let product of productsList" [value]="product.id">{{ product.name }}</option>
                        </select>
                    </td>
                    <td>
                        <input type="number" id="quantity" formControlName="quantity" required title="Ingrese la cantidad" placeholder="Cantidad">
                    </td>
                    <td>
                        <button type="button" (click)="removeProduct(i)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <br>    
    <button class="primary" type="button" (click)="addProduct()">Agregar Producto</button>
    <br><br>
    <button type="submit" class="btn">Enviar Pedido</button>
</form>
```

##### `form-section.component.css`

```css
.form-group {
    margin-bottom: 15px;
}
.form-group label {
    display: block;
    margin-bottom: 5px;
}
.form-group input, .form-group select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

.products-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
}

tr {
    border-bottom: 2px solid #ddd;
    padding-bottom: 2%;
}
```

### InventoryDetailsComponent

#### Descripción

El componente `InventoryDetailsComponent` se utiliza para gestionar los detalles de los productos en el inventario. Permite a los usuarios crear, actualizar y eliminar productos.

#### Código

##### `inventory-details.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {
  productForm: FormGroup;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        (product: Product) => {
          this.productForm.patchValue(product);
        },
        (error) => {
          console.error('Error fetching product', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.productId) {
        this.productService.updateProduct(productData).subscribe(
          (response) => {
            console.log('Product updated successfully', response);
            this.router.navigate(['/inventory']);
          },
          (error) => {
            console.error('Error updating product', error);
          }
        );
      } else {
        this.productService.createProduct(productData).subscribe(
          (response) => {
            console.log('Product created successfully', response);
            this.router.navigate(['/inventory']);
          },
          (error) => {
            console.error('Error creating product', error);
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
          this.router.navigate(['/inventory']);
        },
        (error) => {
          console.error('Error deleting product', error);
        }
      );
    }
  }
}
```

##### `inventory-details.component.html`

```html
<form [formGroup]="productForm" (ngSubmit)="onSubmit()">
  <div class="form-group">
    <label for="name">Nombre del Producto</label>
    <input type="text" id="name" formControlName="name" class="form-control" required>
  </div>
  <div class="form-group">
    <label for="price">Precio</label>
    <input type="number" id="price" formControlName="price" class="form-control" required>
  </div>
  <div class="form-group">
    <label for="stock">Cantidad en Inventario</label>
    <input type="number" id="stock" formControlName="stock" class="form-control" required>
  </div>
  <div class="form-group">
    <label for="image">URL de la Imagen</label>
    <input type="text" id="image" formControlName="image" class="form-control" required>
  </div>
  <button type="submit" class="btn btn-primary">Guardar</button>
  <button type="button" class="btn btn-danger" (click)="onDelete()" *ngIf="productId">Eliminar</button>
</form>
```

## Contribuciones

Damos la bienvenida a contribuciones al proyecto TecnoShop. Para contribuir, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/your-feature`).
3. Realiza tus cambios (`git commit -m 'Add some feature'`).
4. Empuja la rama (`git push origin feature/your-feature`).
5. Abre un pull request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo