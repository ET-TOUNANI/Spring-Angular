import {NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {path: '', component : LoginComponent},
  {path: 'products', component : ProductsComponent},
  {path: 'login', component : LoginComponent},
  //{path: 'products/:productId', component : ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }