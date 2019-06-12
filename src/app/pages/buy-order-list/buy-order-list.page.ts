import { Component, OnDestroy } from '@angular/core';

import { BuyOrder } from '@interfaces';

import { BuyOrderService, UserService } from '@services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-order-list',
  templateUrl: './buy-order-list.page.html',
  styleUrls: ['./buy-order-list.page.scss'],
})
export class BuyOrderListPage implements OnDestroy{
  private buyOrderSub: Subscription;
  public buyOrders: BuyOrder[];

  constructor(buyOrderService: BuyOrderService, userService: UserService) {
    this.buyOrderSub = buyOrderService.buyOrderStream.subscribe((data: BuyOrder[]) => {
      this.buyOrders = data.filter((buyOrder: BuyOrder) => {
        return buyOrder.uid === userService.uid;
      });
    });
  }

  ngOnDestroy() {
    this.buyOrderSub.unsubscribe();
  }

  public newOrder() {
    console.log("new order!");
  }

  public editOrder(buyOrder: BuyOrder) {
    console.log(buyOrder);
  }
}
