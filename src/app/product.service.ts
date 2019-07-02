import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list('/products')
      .snapshotChanges()
      .pipe(
          map(changes =>
              changes.map(c => {
                  const data = c.payload.val() as Product;
                  const id = c.payload.key;
                  return { id, ...data };
              })
          )
      );
  }

  get(productId) {
    return this.db.object('/products/' + productId)
      .valueChanges();
  }

  update(productId, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }
}
