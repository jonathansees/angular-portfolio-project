import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Order } from './models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private shoppigCartService: ShoppingCartService) { }

  async storeOrder(order) {
    let result = await this.db.list('orders').push(order);
    this.shoppigCartService.clearCart();
    return result;
  }

  getAllOrders() {
    const productRef = this.db.list('/orders', ref => ref.orderByChild('datePlaced'));
    return productRef
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => ({ 
            key: c.payload.key, 
            ...c.payload.val()
          }));
    }));
  }

  // getAllOrders(): Observable<Order[]> {
  //   return this.db.list('/orders')
  //     .snapshotChanges()
  //     .pipe(
  //         map(changes =>
  //             changes.map(c => {
  //                 console.log(c.payload.val());
  //                 const data = c.payload.val() as Order;
  //                 const key = c.payload.key;
  //                 return { key, ...data };
  //             })
  //         )
  //     );
  // }

  // getOrdersByUser(userId: string) {
  //   return this.db.list('/orders', {
  //     query: {
  //       orderByChild: 'userId',
  //       equalTo: userId
  //     }
  //   })
  // }

  // 
 
  // getByUserID(userId: string) {
  //    const ordersRef = this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId));
  //    return ordersRef.snapshotChanges().pipe(map(changes => {
  //       return changes.map(c => ({ key: c.payload.key, ...c.payload.val()}));
  //   }));
  // }
}
