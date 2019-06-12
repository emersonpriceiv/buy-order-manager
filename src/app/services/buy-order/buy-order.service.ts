import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { BuyOrder } from '@interfaces';

@Injectable({
  providedIn: 'root'
})
export class BuyOrderService {
  private buyOrders: BuyOrder[] = [];

  constructor(private firebaseDB: AngularFireDatabase) {
    const buyOrderObservable = this.firebaseDB.list('/buyOrders').valueChanges();

    buyOrderObservable.subscribe((data: BuyOrder[]) => {
      this.buyOrders = data;
    });
  }

  public addBuyOrder(buyOrder: BuyOrder) {
    this.firebaseDB.list('/buyOrders').push(buyOrder);
  }

  public getBuyOrders(uid: string): BuyOrder[] {
    return this.buyOrders.filter((buyOrder: BuyOrder) => {
      return buyOrder.uid === uid;
    });
  };
}

