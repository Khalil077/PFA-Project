import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Order {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  // Nested product
  product: any;

  // Nested user (customer)
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
}
@Injectable({
  providedIn: 'root', // ✅ makes it available app-wide
})
export class OrderService {
  private API = 'http://localhost:3000/'; //
  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.http.get(this.API + 'orders/findall');
  }
}
