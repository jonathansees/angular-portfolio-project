import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';
import { ShippingService } from '../shipping.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {
  states$;
  shipping: any = {};
  userId: string;
  userSubscription: Subscription;

  @Input('cart') cart: ShoppingCart;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private shippingService: ShippingService) {}

  ngOnInit() {
    this.states$ = this.shippingService.getAll();
    this.authService.user$.pipe(take(1)).subscribe(user => this.userId = user.uid )
  }
  
  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
