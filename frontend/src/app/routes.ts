// filepath: /c:/Users/herre/Downloads/TecnoShop/frontend/src/app/routes.ts
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { InventoryDetailsComponent } from './components/inventory-details/inventory-details.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { NgModule } from '@angular/core';
import { LoginCompComponent } from './components/login/login.component';

const routeConfig: Routes = [
  {
     path: '',
      component: LoginCompComponent 
    },
    
  {
    path: 'home',
    component: HomeComponent
  },
  
  {
    path: 'inventory/:id',
    component: InventoryDetailsComponent
  },
  {
    path: 'inventory',
    component: CreateProductComponent
  }
];
export default routeConfig;

