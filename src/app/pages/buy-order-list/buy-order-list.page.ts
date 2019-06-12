import { Component } from '@angular/core';

import { BuyOrder } from '@interfaces';

import { BuyOrderService, UserService } from '@services';

@Component({
  selector: 'app-buy-order-list',
  templateUrl: './buy-order-list.page.html',
  styleUrls: ['./buy-order-list.page.scss'],
})
export class BuyOrderListPage {
  public buyOrders: BuyOrder[];

  constructor(buyOrderService: BuyOrderService, userService: UserService) {
    this.buyOrders = buyOrderService.getBuyOrders(userService.uid);
  }
}
