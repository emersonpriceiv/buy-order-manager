import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBuyOrderPage } from './add-edit-buy-order.page';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireDatabaseMock } from '@mocks';

describe('AddEditBuyOrderPage', () => {
  let component: AddEditBuyOrderPage;
  let fixture: ComponentFixture<AddEditBuyOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ AddEditBuyOrderPage ],
      providers: [
        {provide: AngularFireDatabase, useClass: AngularFireDatabaseMock}
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

  xit('creates the page', () => {
    expect(component).toBeTruthy();
  });
});
