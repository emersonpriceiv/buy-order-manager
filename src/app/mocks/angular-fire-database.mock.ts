import * as Observable from 'rxjs';

export class AngularFireDatabaseMock {
  private items = [];
  public listObject = {
    valueChanges: () => Observable.of([
      {
        uid: 'testUid',
        name: 'testName'
      }
    ]),
    push: (item) => {
      this.items.push(item);
    }
  }

  public list = () => {
    return this.listObject;
  };
}