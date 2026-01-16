import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from '../login/login';
import { Register } from '../register/register';
import { ProductList } from '../product-list/product-list';
import { ProductItem } from '../product-item/product-item';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  { path: 'product-list', component: ProductList },
  { path: 'product-item/:id', component: ProductItem },
];
