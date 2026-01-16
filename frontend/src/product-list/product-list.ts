import { Component, inject, signal } from '@angular/core';
import { ApiService, Product } from '../services/api.services';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  private apiService = inject(ApiService);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['categoryId'];
      this.loadProducts(categoryId);
    });
  }
  products = signal<Product[]>([]);

  loadProducts(categoryId?: number) {
    this.isLoading.set(true);
    this.error.set(null);

    this.apiService.getallproducts().subscribe({
      next: (response: Product[]) => {
        // Filter products by category id if provided
        const filtered = categoryId
          ? response.filter((p) => p.category?.id === +categoryId)
          : response;

        this.products.set(filtered);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products');
        this.isLoading.set(false);
      },
    });
  }
}
