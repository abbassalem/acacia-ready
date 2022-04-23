import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../shop/models/category.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  categories: Array<Category>;
  history: any;
  placedOrderSuccess = false;

  constructor(private db: AngularFirestore) {
  }

  getCategories(): Observable<Array<Category>> {

    let cats: Array<Category> = new Array();
    return this.db.collection('categories').snapshotChanges().pipe(
      map( snapshot => {
        cats = snapshot.map(action => action.payload.doc.data() as Category);
        return cats;
      })
    )
  }
}
