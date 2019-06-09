import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BuyOrderService {
  private buyOrders: any;

  constructor(private firebaseDB: AngularFireDatabase) {
    const buyOrderObservable = this.firebaseDB.list('/buy-orders').valueChanges();

    buyOrderObservable.subscribe((data) => {
      this.buyOrders = data;
    });
  }

  public addBuyOrder(buyOrder: any) {
    this.firebaseDB.list('/buyOrders').push(buyOrder);
  }

  public getBuyOrders(uid: string): any {
    return this.buyOrders.filter((buyOrder) => {
      return buyOrder.uid === uid;
    });
  };
}

