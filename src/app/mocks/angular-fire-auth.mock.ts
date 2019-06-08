import * as Observable from 'rxjs';

export class AngularFireAuthMock {
  public authState = Observable.of({email: 'testEmail'});

  public auth = {
    signInWithEmailAndPassword: () => {},
    signOut: () => {},
    createUserWithEmailAndPassword: () => {}
  }
}