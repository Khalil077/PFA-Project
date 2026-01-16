import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  product_name: string;
  product_description?: string;
  prix: number;
  category: any;
  pictures: any[];
  stock: number;
  createdAt?: Date;
}

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
}
export interface Category {
  id: number;
  product_category_name: string; // Your actual property name
  createdAt?: string;
  updateAt?: string;
  deleteAt?: string | null;
  // Add other properties you see in the response
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  statusCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/'; // NestJS backend URL

  constructor(private http: HttpClient) {}
  getallproducts(): Observable<any> {
    return this.http.get(this.apiUrl + 'products/getproducts');
  }
  getlallcategories(): Observable<any> {
    return this.http.get(this.apiUrl + 'product-categories/getall');
  }
}
