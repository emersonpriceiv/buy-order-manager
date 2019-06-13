import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'buy-order-list', loadChildren: './pages/buy-order-list/buy-order-list.module#BuyOrderListPageModule' },
  { path: 'add-edit-buy-order', loadChildren: './pages/add-edit-buy-order/add-edit-buy-order.module#AddEditBuyOrderPageModule' },
  { path: 'add-edit-buy-order/:name', loadChildren: './pages/add-edit-buy-order/add-edit-buy-order.module#AddEditBuyOrderPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
