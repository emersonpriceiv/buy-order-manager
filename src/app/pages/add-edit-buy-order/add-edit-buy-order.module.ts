import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddEditBuyOrderPage } from './add-edit-buy-order.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditBuyOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddEditBuyOrderPage]
})
export class AddEditBuyOrderPageModule {}
