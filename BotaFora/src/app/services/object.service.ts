import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private objectsColletion: AngularFirestoreCollection<Object>;

  constructor(private afs: AngularFirestore) {
    this.objectsColletion = this.afs.collection<Object>('Objects');
  }

  getObjects() {
    return this.objectsColletion.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getFilteredObjects(filter: object){ /*Filter parameter has: searchTerm, state, city, category*/
      return this.afs.collection<Object>('Objects', ref => ref.where('category', '==', 'mesas'));
  }

  addObject(object: Object) {
    return this.objectsColletion.add(object);
  }

  getObject(id: string) {
    return this.objectsColletion.doc<Object>(id).valueChanges();
  }

  updateObject(id: string, object: Object) {
    return this.objectsColletion.doc<Object>(id).update(object);
  }

  deleteObject(id: string) {
    return this.objectsColletion.doc(id).delete();
  }
}
