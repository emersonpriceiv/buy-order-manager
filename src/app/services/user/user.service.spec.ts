import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';

import { MockAngularFireAuth } from '@mocks';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [{ provide: AngularFireAuth, useClass: MockAngularFireAuth}]
  }));

  it('creates the service', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});