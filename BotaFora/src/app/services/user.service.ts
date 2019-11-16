import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/firestore';
import { RegisterCredential } from '../interfaces/RegisterCredential';
import { LoginCredential } from '../interfaces/LoginCredential';
import { database } from 'firebase';

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

    async getUserName(id: string): Promise<String> {
      return await this._angularFirestore
        .collection("users")
        .doc(id)
        .get()
        .toPromise()
        .then((value: DocumentSnapshot<RegisterCredential>) => {
          return value.data().name;
        }).catch((err) => {
          console.log(err)
          return "";
        });
    }

    async getUserPhoneNumber(id: string): Promise<String> {
      return await this._angularFirestore
        .collection("users")
        .doc(id)
        .get()
        .toPromise()
        .then((value: DocumentSnapshot<RegisterCredential>) => {
          return value.data().phoneNumber;
        }).catch((err) => {
          console.log(err)
          return "";
        });
    }
}
