import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { BuyOrder } from '@interfaces';


@Injectable({
  providedIn: 'root'
})
export class BuyOrderService {
  private _buyOrderStream: Observable<unknown[]>;

  constructor(private firebaseDB: AngularFireDatabase) {
    this._buyOrderStream = this.firebaseDB.list('/buyOrders').valueChanges();
  }

  get buyOrderStream() {
    return this._buyOrderStream;
  }

  public addBuyOrder(buyOrder: BuyOrder) {
    return this.firebaseDB.list('/buyOrders').push(buyOrder);
  }

  public remove(name: string) {
    const buyOrdersRef = this.firebaseDB.database.ref('/buyOrders');
    const buyOrder = buyOrdersRef.orderByChild('name').equalTo(name);

    buyOrder.on('value', (buyOrderSnapshot) => {
      buyOrderSnapshot.forEach((removeOrder: any) => {
        removeOrder.ref.remove();
        buyOrder.off();
      });
    });
  }
}

