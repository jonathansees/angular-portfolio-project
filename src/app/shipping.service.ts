import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db
      .list('/states', ref => ref.orderByChild('state'))
      .snapshotChanges();
  }
}
