import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { UserService } from '@services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(formBuilder: FormBuilder, private userService: UserService, private navController: NavController) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  public onSubmit(): void {
    this.userService.signIn(this.loginForm.value).then(() => this.navController.navigateForward('/buy-order-list'));
  }
}
