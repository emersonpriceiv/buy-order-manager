import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  private user: {};
    
  get email(): string {
    return '';
  }

  get authenticated(): boolean {
    return true;
  }

  signIn(credentials) {
	  return new Promise(() => {});
  }

  signOut(): Promise<void> {
    return new Promise(() => {});
  }
    
  signUp(credentials) {
    return new Promise(() => {});
  }
}
