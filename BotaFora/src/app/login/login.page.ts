import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredential } from '../interfaces/LoginCredential';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  loginFormGroup: FormGroup;

  constructor(
    private _toastController: ToastController,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    formBuilder: FormBuilder) {
    this.loginFormGroup = formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit() {
  }

  login() {
    const loginCredentials: LoginCredential = this.loginFormGroup.value;
    this._authenticationService.login(loginCredentials)
      .then(() => {
        this._router.navigate(["/home"]);
      })
      .catch((error) => {
        this.showShortMiddleToast(error.message);
      });
  }

  private async showShortMiddleToast(message: string): Promise<void> {
    const toast = await this._toastController.create({
      message: message,
      duration: 3000,
      position: "middle"
    });
    return toast.present();
  }

}
