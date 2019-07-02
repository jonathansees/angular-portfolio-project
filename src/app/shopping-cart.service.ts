import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from './models/product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    if (cartId) {
      return this.db.object('/shopping-carts/' + cartId).snapshotChanges().pipe(
        map((action:any) => {
          const items = action.payload.val().items;
          return new ShoppingCart(items);
        })
      )
    }
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    console.log();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.id);

    item$.snapshotChanges().pipe(take(1)).subscribe((item:any) => {
      item$
      if(item.payload.val()){
        let quantity = item.payload.val().quantity + change;
        if (quantity === 0) {
          item$.remove();
        }
        else {
          item$.update({
            brand: product.brand,
            model: product.model,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: quantity
          })
        }
      }
      
      else{
        item$.update({
            brand: product.brand,
            model: product.model,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: 1
        })
      }
    });
  }
}
