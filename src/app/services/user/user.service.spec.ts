import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { AngularFireAuthMock } from '@mocks';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthMock}]
  }));

  beforeEach(() => {
    userService = TestBed.get(UserService);
  });

  it('creates the service', () => {
    expect(userService).toBeTruthy();
  });

  describe('get email()', () => {
    it('returns the user\'s email', () => {
      expect(userService.email).toEqual('testEmail');
    });
  });

  describe('get authenticated()', () => {
    it('returns the user\'s authenticated state', () => {
      expect(userService.authenticated).toBeTruthy();
    });
  });

  describe('signIn()', () => {
    it('logs in with the provided credentials', () => {
      const email = 'testEmail';
      const password = 'testPassword';
      const authService: AngularFireAuth = TestBed.get(AngularFireAuth);
      const authSpy = spyOn(authService.auth, 'signInWithEmailAndPassword');
      userService.signIn({email, password});
      expect(authSpy).toHaveBeenCalledWith(email, password);
    });
  });

  describe('signOut()', () => {
    it('logs out', () => {
      const authService: AngularFireAuth = TestBed.get(AngularFireAuth);
      const authSpy = spyOn(authService.auth, 'signOut');
      userService.signOut();
      expect(authSpy).toHaveBeenCalled();
    });
  });

  describe('signUp()', () => {
    it('creates a user with the provided credentials', () => {
      const email = 'testEmail';
      const password = 'testPassword';
      const authService: AngularFireAuth = TestBed.get(AngularFireAuth);
      const authSpy = spyOn(authService.auth, 'createUserWithEmailAndPassword');
      userService.signUp({email, password});
      expect(authSpy).toHaveBeenCalledWith(email, password);
    });
  });
});
