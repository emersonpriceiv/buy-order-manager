import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { UserService } from '@services';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userForm: FormGroup;
  public loginLoading = false;
  public signUpLoading = false;

  constructor(formBuilder: FormBuilder, private userService: UserService, private navController: NavController) {
    this.userForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public logIn(): void {
    this.loginLoading = true;
    this.userService.signIn(this.userForm.value).then(() => {
      this.navController.navigateForward('/buy-order-list');
    });
  }

  public signUp(): void {
    this.signUpLoading = true;
    this.userService.signUp(this.userForm.value).then(() => {
      this.navController.navigateForward('/buy-order-list');
    });
  }
}
