import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';

import { AngularFireDatabaseMock, AngularFireAuthMock, UserServiceMock } from '@mocks';

import { AddEditBuyOrderPage } from './add-edit-buy-order.page';
import { BuyOrderListPageModule } from '../buy-order-list/buy-order-list.module';
import { UserService, BuyOrderService } from '@services';


describe('AddEditBuyOrderPage', () => {
  let component: AddEditBuyOrderPage;
  let fixture: ComponentFixture<AddEditBuyOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
        {path: 'buy-order-list', component: BuyOrderListPageModule}
      ])],
      declarations: [ AddEditBuyOrderPage ],
      providers: [
        { provide: AngularFireDatabase, useClass: AngularFireDatabaseMock },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        { provide: UserService, useClass: UserServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBuyOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the page', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('sets the title according to nav params', () => {
      expect(component.title).toEqual('Add');
      const router = TestBed.get(ActivatedRoute);
      router.params.next({name: 'testName'});
      fixture.detectChanges();
      expect(component.title).toEqual('Edit');
    });
  });

  describe('save()', () => {
    it('creates new buy order', () => {
      const buyOrderService = TestBed.get(BuyOrderService);
      const userService = TestBed.get(UserService);
      const addOrderSpy = spyOn(buyOrderService, 'addBuyOrder');
      const removeSpy = spyOn(buyOrderService, 'remove');

      const formObject = {
        name: 'testName',
        maxBidPrice: 50,
        dataPackageType: 'Device Location'
      };

      component.buyOrderForm.setValue(formObject);
      component.save();
      expect(removeSpy).not.toHaveBeenCalled();
      expect(addOrderSpy).toHaveBeenCalledWith({...formObject, uid: userService.uid});
    });

    it('removes old buy order and creates a new one on edit', () => {
      const buyOrderService = TestBed.get(BuyOrderService);
      const userService = TestBed.get(UserService);
      const addOrderSpy = spyOn(buyOrderService, 'addBuyOrder');
      const removeSpy = spyOn(buyOrderService, 'remove');

      const formObject = {
        name: 'testName',
        maxBidPrice: 50,
        dataPackageType: 'Device Location'
      };

      component.oldBuyOrder = {
        name: 'testName',
        maxBidPrice: 100,
        dataPackageType: 'Device Location',
        uid: userService.uid
      }

      component.buyOrderForm.setValue(formObject);
      component.save();
      expect(removeSpy).toHaveBeenCalledWith(component.oldBuyOrder.name);
      expect(addOrderSpy).toHaveBeenCalledWith({...formObject, uid: userService.uid});
    });
  });
});
