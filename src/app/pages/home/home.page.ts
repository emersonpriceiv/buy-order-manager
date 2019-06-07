import { Component, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('loginSlider') loginSlides: IonSlides;

  public slideNext(){
    this.loginSlides.slideNext();
  }

  public slidePrevious(){
    this.loginSlides.slidePrev();
  }
}
