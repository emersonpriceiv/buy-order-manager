import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { UserServiceMock } from '@mocks';

import { UserService } from '@services';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule, ReactiveFormsModule , RouterTestingModule],
      declarations: [SignUpComponent],
      providers: [
        { provide: UserService, useClass: UserServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit()', () => {
    it('submits the credentials to the user service', () => {
      const userService: UserService = TestBed.get(UserService);
      const signUpSpy = spyOn(userService, 'signUp').and.returnValue(Promise.resolve(''));;
      const email = 'testEmail';
      const password = 'testPassword';

      component.signUpForm = {
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
