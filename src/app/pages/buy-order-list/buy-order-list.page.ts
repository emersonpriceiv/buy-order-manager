import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { BuyOrder } from '@interfaces';

import { BuyOrderService, UserService } from '@services';

@Component({
  selector: 'app-buy-order-list',
  templateUrl: './buy-order-list.page.html',
  styleUrls: ['./buy-order-list.page.scss'],
})
export class BuyOrderListPage implements OnDestroy, OnInit {
  private buyOrderSub: Subscription;
  public buyOrders: BuyOrder[];

  constructor(
    private buyOrderService: BuyOrderService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.buyOrderSub = this.buyOrderService.buyOrderStream.subscribe((data: BuyOrder[]) => {
      this.buyOrders = data.filter((buyOrder: BuyOrder) => {
        return buyOrder.uid === this.userService.uid;
      });
    });
  }

  ngOnDestroy() {
    this.buyOrderSub.unsubscribe();
  }
}
