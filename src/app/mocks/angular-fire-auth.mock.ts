import * as Observable from 'rxjs';

export class AngularFireAuthMock {
  public authState = Observable.of({uid: 'testUid'});

  public auth = {
    signInWithEmailAndPassword: () => {},
    signOut: () => {},
    createUserWithEmailAndPassword: () => {}
  };
}
