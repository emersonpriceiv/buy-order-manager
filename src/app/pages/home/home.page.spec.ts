import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomePage } from './home.page';
import { UserService } from '@services';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserServiceMock } from '@mocks';
import { IonicModule } from '@ionic/angular';
import { BuyOrderListPageModule } from '../buy-order-list/buy-order-list.module';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  const email = 'testEmail';
  const password = 'testPassword';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule , RouterTestingModule.withRoutes([
        { path: 'buy-order-list', component: BuyOrderListPageModule}
      ])],
      declarations: [HomePage],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates the page', () => {
    expect(component).toBeTruthy();
  });

  describe('logIn()', () => {
    it('submits the credentials to the user service for login', () => {
      const userService: UserService = TestBed.get(UserService);
      const signUpSpy = spyOn(userService, 'signIn').and.returnValue(Promise.resolve(''));

      component.userForm = {
        value: {
          email,
          password
        }
      } as FormGroup;

      component.logIn();

      expect(signUpSpy).toHaveBeenCalledWith({email, password});
    });

    it('manages login spinner', () => {
      expect(component.loginLoading).toBeFalsy();
      component.logIn();
      expect(component.loginLoading).toBeTruthy();
    });
  });

  describe('signUp()', () => {
    it('submits the credentials to the user service for sign up', () => {
      const userService: UserService = TestBed.get(UserService);
      const signUpSpy = spyOn(userService, 'signUp').and.returnValue(Promise.resolve(''));

      component.userForm = {
        value: {
          email,
          password
        }
      } as FormGroup;

      component.signUp();

      expect(signUpSpy).toHaveBeenCalledWith({email, password});
    });

    it('manages sign up spinner', () => {
      expect(component.signUpLoading).toBeFalsy();
      component.signUp();
      expect(component.signUpLoading).toBeTruthy();
    });
  });
});
