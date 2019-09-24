import { Injectable } from '@angular/core';
import { LoginCredential } from '../interfaces/LoginCredential';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterCredential } from '../interfaces/RegisterCredential';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _angularFireAuth: AngularFireAuth) {}

  registerUser(credencials: RegisterCredential): Promise<firebase.auth.UserCredential> {
    return this._angularFireAuth.auth.createUserWithEmailAndPassword(
      credencials.email, 
      credencials.password
    );
  }

  login(credencials: LoginCredential): Promise<firebase.auth.UserCredential> {
    return this._angularFireAuth.auth.signInWithEmailAndPassword(
      credencials.email,
      credencials.password
    );
  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._angularFireAuth.auth.currentUser) {
        this._angularFireAuth.auth.signOut()
        .then(() => {
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  getAuth() {
    return this._angularFireAuth.auth;
  }
}
