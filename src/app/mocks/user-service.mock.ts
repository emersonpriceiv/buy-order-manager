import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceMock {
  get uid(): string {
    return 'testUid';
  }

  get authenticated(): boolean {
    return true;
  }

  signIn() {
	  return new Promise(() => {});
  }

  signOut(): Promise<void> {
    return new Promise(() => {});
  }
    
  signUp() {
    return new Promise(() => {});
  }
}
