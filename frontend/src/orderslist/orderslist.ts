import { Component, computed, inject, signal } from '@angular/core';
import { Order, OrderService } from '../services/order.services';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-orderslist',
  imports: [CommonModule],
  templateUrl: './orderslist.html',
  styleUrl: './orderslist.css',
})
export class Orderslist {
  ordersService = inject(OrderService);
  error = signal<string | null>(null);

  ngOnInit() {
    this.ordersService.getAllOrders().subscribe({
      next: (response) => {
        // convert createdAt strings to Date objects
        this.orders2.set(
          response.map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
          }))
        );
      },
      error: (err) => {
        console.log(err);
        this.error.set('Failed to load orders');
      },
    });
  }

  // Static orders data
  orders2 = signal<Order[]>([]);

  // Filter signals
  searchQuery = signal<string>('');
  statusFilter = signal<string>('all');
  sortField = signal<string>('date');
  sortDirection = signal<'asc' | 'desc'>('desc');

  // Computed signal for filtered and sorted orders
  filteredOrders = computed(() => {
    const orders = this.orders2();
    const search = this.searchQuery().toLowerCase();
    const status = this.statusFilter();
    const field = this.sortField();
    const direction = this.sortDirection();

    let filtered = orders.filter((order) => {
      const matchesSearch =
        search === '' || order.product.product_name.toLowerCase().includes(search);

      const matchesStatus = status === 'all' || order.status === status;

      return matchesSearch && matchesStatus;
    });

    // Sort the filtered results
    return filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (field === 'date') {
        aValue = a.createdAt;
        bValue = b.createdAt;
      } else if (field === 'status') {
        aValue = a.status;
        bValue = b.status;
      } else {
        return 0;
      }

      return direction === 'asc' ? (aValue > bValue ? 1 : -1) : aValue < bValue ? 1 : -1;
    });
  });

  // Event handlers
  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onStatusFilterChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.statusFilter.set(select.value);
  }

  // Sort orders
  sortOrders(field: string) {
    if (this.sortField() === field) {
      // Toggle direction if same field
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default descending order
      this.sortField.set(field);
      this.sortDirection.set('desc');
    }
  }

  // Format date
  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  // Get status display text
  getStatusText(status: string): string {
    const statusMap: Record<string, string> = {
      pending: 'Pending',
      processing: 'Processing',
      shipped: 'Shipped',
      delivered: 'Delivered',
      cancelled: 'Cancelled',
    };
    return statusMap[status] || status;
  }
}
