import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { BuyOrder } from '@interfaces';
import { Observable } from 'rxjs';

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
    const buyOrders = buyOrdersRef.orderByChild('name').equalTo(name);

    buyOrders.on('value', (buyOrdersSnapshot) => {
      buyOrdersSnapshot.forEach((buyOrderSnapshot: any) => {
        buyOrderSnapshot.ref().remove();
      });
    });
  }
}

