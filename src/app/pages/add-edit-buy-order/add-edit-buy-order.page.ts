import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BuyOrder } from '@interfaces';

import { BuyOrderService } from '@services';


@Component({
  selector: 'app-add-edit-buy-order',
  templateUrl: './add-edit-buy-order.page.html',
  styleUrls: ['./add-edit-buy-order.page.scss'],
})
export class AddEditBuyOrderPage {
  public title: string = 'Add';
  public buyOrder: BuyOrder;

  private paramsSub: Subscription;
  private buyOrderSub: Subscription;
  private orderName: string;

  constructor(private route: ActivatedRoute, private buyOrderService: BuyOrderService) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      console.log(params);
      this.orderName = params['name'];
      this.title = 'Edit';
    });

    this.buyOrderSub = this.buyOrderService.buyOrderStream.subscribe((data: BuyOrder[]) => {
      this.buyOrder = data.find((buyOrder: BuyOrder) => {
        return this.orderName && this.orderName === buyOrder.name;
      });
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.buyOrderSub.unsubscribe();
  }
}
