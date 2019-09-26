import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RegisterCredential } from '../interfaces/RegisterCredential';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  registerFormGroup: FormGroup;

  constructor(
    private _menuController: MenuController,
    private _alertController: AlertController, 
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    formBuilder: FormBuilder) { 
      this.registerFormGroup = formBuilder.group({
        name: ["", [Validators.required]],
        lastName: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmedPassword: ["", [Validators.required, Validators.minLength(6)]],
        street: ["", [Validators.required]],
        number: ["", [Validators.required]],
        complement: [""],
        state: ["", [Validators.required]],
        cep: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
      }, {validator: this.checkPasswords })
  }

  ngOnInit() { 
    this._menuController.enable(false);
  }

  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPassword = group.get('confirmedPassword').value;

    return pass === confirmPassword ? null : { notSame: true }     
  }

  createAccount() {
    const registerCredentials: RegisterCredential = this.registerFormGroup.value;
    this._authenticationService.registerUser(registerCredentials).then(() => {
      this._userService.createUser(registerCredentials).then(() =>{
        this._router.navigate(["/home"]);
      })
    })

  }
}


