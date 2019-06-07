import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';
import { IonicModule, IonSlides } from '@ionic/angular';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage, IonSlides ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the page', () => {
    expect(component).toBeTruthy();
  });

  describe ('slideNext()', () => {
    it('calls IonSlides.slideNext()', () => {
      const slideNextSpy = spyOn(component.loginSlides, 'slideNext');
      component.slideNext();
      expect(slideNextSpy).toHaveBeenCalled();
    });
  });

  describe ('slidePrevious()', () => {
    it('calls IonSlides.slidePrev()', () => {
      const slidePrevSpy = spyOn(component.loginSlides, 'slidePrev');
      component.slidePrevious();
      expect(slidePrevSpy).toHaveBeenCalled();
    });
  });
});
