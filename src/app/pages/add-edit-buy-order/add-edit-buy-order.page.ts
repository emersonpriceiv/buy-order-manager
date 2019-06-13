import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { BuyOrder, DATA_PACKAGE_TYPE_OPTIONS } from '@interfaces';

import { BuyOrderService, UserService } from '@services';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-add-edit-buy-order',
  templateUrl: './add-edit-buy-order.page.html',
  styleUrls: ['./add-edit-buy-order.page.scss'],
})
export class AddEditBuyOrderPage {
  public title: string = 'Add';
  public buyOrder: BuyOrder;
  public buyOrderForm: FormGroup;
  public dataPackageTypeOptions: string[] = DATA_PACKAGE_TYPE_OPTIONS;

  private paramsSub: Subscription;
  private buyOrderSub: Subscription;
  private orderName: string;

  constructor(
    private route: ActivatedRoute,
    private buyOrderService: BuyOrderService,
    private formBuilder: FormBuilder,
    private navController: NavController,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.orderName = params['name'];
      this.title = 'Edit';
    });

    this.buyOrderSub = this.buyOrderService.buyOrderStream.subscribe((data: BuyOrder[]) => {
      this.buyOrder = data.find((buyOrder: BuyOrder) => {
        return this.orderName && this.orderName === buyOrder.name;
      });

      if (this.buyOrder) {
        this.buyOrderForm.controls['name'].setValue(this.buyOrder.name);
        this.buyOrderForm.controls['maxBidPrice'].setValue(this.buyOrder.maxBidPrice);
        this.buyOrderForm.controls['dataPackageType'].setValue(this.buyOrder.dataPackageType);
      }
    });

    this.buyOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      maxBidPrice: ['', Validators.required],
      dataPackageType: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
    this.buyOrderSub.unsubscribe();
  }

  cancel() {
    this.navController.navigateBack('/buy-order-list');
  }

  save() {
    if (this.buyOrder){

    } else {
      const buyOrder = {...this.buyOrderForm.value, uid: this.userService.uid};
      this.buyOrderService.addBuyOrder(buyOrder).then(() => {
        this.navController.navigateBack('/buy-order-list');
      });
    }
  }
}
