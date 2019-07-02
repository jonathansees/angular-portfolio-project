import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';
import { CategoryService } from '../category.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})

export class BsNavbarComponent implements OnInit {
  brands$;
  @Input('brand') brand;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService, private categoryService: CategoryService) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.brands$ = this.categoryService.getAll();
  }

  logout() {
    this.auth.logout();
  }
}
