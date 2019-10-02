import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/Category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _angularFirestore: AngularFirestore) {
  }

  getCategories(): Observable<Array<Category>> {
    return this._angularFirestore.collection<Category>('Categories').valueChanges();
  }
}
