import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService, Product } from '../../services/api.services';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private ApiService: ApiService, private cdr: ChangeDetectorRef) {}
  products: Product[] = [];

  loadproducts() {
    this.ApiService.getallproducts().subscribe((res: any) => {
      this.products = res;
      this.cdr.detectChanges();
    });
  }
  ngOnInit() {
    this.loadproducts();
  }
}
