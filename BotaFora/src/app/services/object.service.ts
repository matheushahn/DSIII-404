import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Object } from '../interfaces/Object';
import { Observable } from 'rxjs';
import { FilterData } from '../interfaces/FilterData';
import { ObjectInterest } from '../interfaces/ObjectInterest';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private objectsCollection: AngularFirestoreCollection<Object>;

  constructor(private afs: AngularFirestore) {
    this.objectsCollection = this.afs.collection<Object>('Objects');
  }

  getObjects() {
    return this.objectsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getObjectByFilterData(filterData: FilterData): Observable<Object[]> {
    return this.objectsCollection.snapshotChanges().pipe( 
      map(actions => {
        return actions
          .filter(a => {
            const obj: Object = a.payload.doc.data();
            return (filterData.searchTerm ? obj.name.toLowerCase().includes(filterData.searchTerm.toLowerCase()) : true) 
              && (filterData.category ? obj.category === filterData.category : true) 
              && (filterData.city ? obj.city.toLowerCase().includes(filterData.city.toLowerCase()) : true) 
              && (filterData.state ? obj.state.toLowerCase() === filterData.state.toLowerCase() : true) 
          }).map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;

            return { id, ...data };
          });
      })
    )
  }

  addObject(object: Object) {
    return this.objectsCollection.add(object);
  }

  getObject(id: string) {
    return this.objectsCollection.doc<Object>(id).valueChanges();
  }

  getInterestList(id: string) {
    return this.objectsCollection.doc<Object>(id).collection<ObjectInterest>("interestList").valueChanges();
  }

  getInterestListFilterByUser(id: string, userId: string) {
    return this.objectsCollection.doc<Object>(id).collection<ObjectInterest>("interestList", ref => ref.where('userId', '==', userId)).valueChanges();
  }

  updateObject(id: string, object: Object) {
    return this.objectsCollection.doc<Object>(id).update(object);
  }

  updateObjectCollection(id: string, collection_name: string, object: Object) {
    return this.objectsCollection.doc<Object>(id).collection(collection_name).add(object);
  }

  deleteObject(id: string) {
    return this.objectsCollection.doc(id).delete();
  }
}
