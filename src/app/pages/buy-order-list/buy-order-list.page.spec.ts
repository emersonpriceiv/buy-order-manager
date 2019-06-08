import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrderListPage } from './buy-order-list.page';

describe('BuyOrderListPage', () => {
  let component: BuyOrderListPage;
  let fixture: ComponentFixture<BuyOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyOrderListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the page', () => {
    expect(component).toBeTruthy();
  });
});
