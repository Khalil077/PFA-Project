import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService, Product } from '../services/api.services';

@Component({
  selector: 'app-product-item',
  imports: [RouterModule, CommonModule],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
})
export class ProductItem {
  private apiService = inject(ApiService);
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);
  private route = inject(ActivatedRoute);
  product = signal<Product | null>(null);
  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.apiService.getproductbyid(Number(productId)).subscribe({
        next: (product) => {
          this.product.set(product);
          this.isLoading.set(false);
          console.log('Loaded product:', product);
        },
        error: (err) => {
          this.error.set('Failed to load product');
          this.isLoading.set(false);
        },
      });
    }
  }
  productName = 'iPhone 15 Pro';
  productDescription =
    'Latest Apple smartphone with A17 Pro chip, titanium design, and advanced camera system';
  productPrice = 999;
  productCategory = 'Smartphones';
  productRating = 4.8;
  productStock = 10;
  productImage =
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch?wid=5120&hei=2880&fmt=webp&qlt=70&.v=1693009279096';

  // Computed properties
  get inStock(): boolean {
    return this.productStock > 0;
  }

  get stockText(): string {
    return this.productStock > 0 ? `${this.productStock} items left` : 'Sold Out';
  }

  get buttonText(): string {
    return this.productStock > 0 ? 'Add to Cart' : 'Out of Stock';
  }

  // Get stock class for indicator
  getStockClass(): string {
    if (this.productStock === 0) {
      return 'out-of-stock';
    } else if (this.productStock < 5) {
      return 'low-stock';
    } else {
      return 'in-stock';
    }
  }

  // Empty functionality methods
  viewDetails() {
    console.log('View Details clicked');
    alert(`Viewing details for: ${this.productName}`);
    // In real app: this.router.navigate(['/product', productId]);
  }

  addToCart() {
    if (this.inStock) {
      console.log('Add to Cart clicked');
      alert(`${this.productName} added to cart!`);
      // In real app: this.cartService.add(product);
    }
  }

  addToWishlist() {
    console.log('Add to Wishlist clicked');
    alert(`${this.productName} added to wishlist!`);
    // In real app: this.wishlistService.add(product);
  }

  quickView() {
    console.log('Quick View clicked');
    alert(`Quick view for: ${this.productName}`);
    // In real app: open modal with product details
  }

  addToCompare() {
    console.log('Add to Compare clicked');
    alert(`${this.productName} added to compare!`);
    // In real app: this.compareService.add(product);
  }
  imageIndex = signal(0); // 🔥 current image index

  imageUrl = computed(() => {
    const pictures = this.product()?.pictures;
    if (!pictures || pictures.length === 0) {
      return 'assets/images/placeholder.jpg';
    }
    return pictures[this.imageIndex()]?.url;
  });

  nextImage() {
    const pictures = this.product()?.pictures;
    if (!pictures || pictures.length === 0) return;

    this.imageIndex.update((i) => (i + 1 >= pictures.length ? 0 : i + 1));
  }
}
