import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth) {
    firebaseAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  get uid(): string {
    return this.user.uid;
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  signIn(credentials) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut(): Promise<void> {
    return this.firebaseAuth.auth.signOut();
  }

  signUp(credentials) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }
}
