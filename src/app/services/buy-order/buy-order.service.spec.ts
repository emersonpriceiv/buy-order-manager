import { TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from '@angular/fire/database';

import { BuyOrder } from '@interfaces';

import { AngularFireDatabaseMock } from '@mocks';

import { BuyOrderService } from './buy-order.service';


describe('BuyOrderService', () => {
  let buyOrderService: BuyOrderService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock }
    ]
  }));

  beforeEach(() => {
    buyOrderService = TestBed.get(BuyOrderService);
  });

  it('creates the service', () => {
    expect(buyOrderService).toBeTruthy();
  });

  describe('addBuyOrder()', () => {
    it('adds a buy order to firebase', () => {
      const dbService = TestBed.get(AngularFireDatabase);
      const addToListSpy = spyOn(dbService.list(), 'push');

      buyOrderService.addBuyOrder({} as BuyOrder);
      expect(addToListSpy).toHaveBeenCalled();
    });
  });

  describe('getBuyOrders()', () => {
    it('gets buy orders for the provided uid', () => {
      expect(buyOrderService.getBuyOrders('testUid')[0].name).toEqual('testName');
    })
  });
});
