import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  brand: string;
  cart$: Observable<ShoppingCart>;
  showFiller = false;
  screenWidth;
  breakpoint;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
    this.breakpoint = this.getCols(window.innerWidth);
  }

  onResize(event) {
    this.breakpoint = this.getCols(event.target.innerWidth);
  }

  getCols(windowWidth) {
    if (windowWidth > 1280) {
      return 4
    } else if (windowWidth > 992) {
      return 3
    } else if (windowWidth > 768) {
      return 2
    } else if (windowWidth > 576) {
      return 1
    }
  }

  private populateProducts() {
    this.productService.getAll().subscribe(products => {
      this.products = products
    
      this.route.queryParamMap.subscribe(params => {
        this.brand = params.get('brand');
        this.applyFilter();
      });
    });
  } 

  private applyFilter() {
    this.filteredProducts = (this.brand) ?
    this.products.filter(p => p.brand === this.brand) :
    this.products;
  }
}
