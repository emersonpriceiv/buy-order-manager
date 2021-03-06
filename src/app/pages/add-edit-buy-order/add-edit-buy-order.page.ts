import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NavController, AlertController } from '@ionic/angular';

import { BuyOrder, DATA_PACKAGE_TYPE_OPTIONS } from '@interfaces';

import { BuyOrderService, UserService } from '@services';


@Component({
  selector: 'app-add-edit-buy-order',
  templateUrl: './add-edit-buy-order.page.html',
  styleUrls: ['./add-edit-buy-order.page.scss'],
})
export class AddEditBuyOrderPage implements OnInit, OnDestroy {
  public title = 'Add';
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
    private userService: UserService,
    private alertController: AlertController
  ) {}

  private _oldBuyOrder: BuyOrder;

  get oldBuyOrder() {
    return this._oldBuyOrder;
  }

  set oldBuyOrder(buyOrder) {
    this._oldBuyOrder = buyOrder;

    if (buyOrder) {
      this.buyOrderForm.controls.name.setValue(this.oldBuyOrder.name);
      this.buyOrderForm.controls.maxBidPrice.setValue(this.oldBuyOrder.maxBidPrice);
      this.buyOrderForm.controls.dataPackageType.setValue(this.oldBuyOrder.dataPackageType);
    }
  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      this.orderName = params.name;

      if (this.orderName) {
        this.title = 'Edit';
      }
    });

    this.buyOrderSub = this.buyOrderService.buyOrderStream.subscribe((data: BuyOrder[]) => {
      this.oldBuyOrder = data.filter((buyOrder: BuyOrder) => {
        return buyOrder.uid === this.userService.uid;
      }).find((buyOrder: BuyOrder) => {
        return this.orderName && this.orderName === buyOrder.name;
      });
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

  public save() {
    const newBuyOrder = {...this.buyOrderForm.value, uid: this.userService.uid};

    if (this.oldBuyOrder) {
      this.buyOrderService.remove(this.oldBuyOrder.name);
    }

    this.buyOrderService.addBuyOrder(newBuyOrder);
  }

  public async showConfirmAlert() {
    const removeConfirmAlert = await this.alertController.create({
      header: 'Confirm delete buy order',
      message: 'Are you sure you want to permanently delete this buy order?',
      buttons: [
        'No',
        {
          text: 'Yes',
          handler: () => {
            this.buyOrderService.remove(this.oldBuyOrder.name);
            this.navController.navigateBack('/buy-order-list');
          }
        }
      ]
    });

    await removeConfirmAlert.present();
  }
}
