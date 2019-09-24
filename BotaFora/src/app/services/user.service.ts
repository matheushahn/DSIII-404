import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { RegisterCredential } from '../interfaces/RegisterCredential';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _angularFireAuth: AngularFireAuth,
    private _angularFirestore: AngularFirestore
    ) { }

    createUser(credencials: RegisterCredential): Promise<any> {
      return this._angularFirestore
        .collection("users")
        .doc(this._angularFireAuth.auth.currentUser.uid)
        .set(credencials)
    }
}
