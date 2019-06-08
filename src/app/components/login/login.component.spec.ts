import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserServiceMock } from '@mocks';

import { UserService } from '@services';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('submits the credentials to the user service for login', () => {
      const userService: UserService = TestBed.get(UserService);
      const signUpSpy = spyOn(userService, 'signIn').and.returnValue(Promise.resolve(''));;
      const email = 'testEmail';
      const password = 'testPassword';

      component.loginForm = {
        value: {
          email,
          password
        }
      } as FormGroup;

      component.onSubmit();

      expect(signUpSpy).toHaveBeenCalledWith({email, password});
    });
  });
});
