import { Injectable } from '@angular/core';
import { Order, DurationWithStatus} from '../../shop/models/order.model';
import { AngularFirestore, DocumentData , QuerySnapshot } 
        from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class OrderService {

    constructor(private db: AngularFirestore) {}
  
    async saveOrder(order: Order): Promise<Order> {
      let saved: Order;  
      let docRef = await this.db.collection('orders').add(order);
      let docData = <Order> await (await docRef.get()).data();
      saved = Object.assign({id: docRef.id}, docData);
      this.db.collection('orders').doc(docRef.id).set({id: docRef.id}, {merge:true});
      return saved;  
    }


   // TODO: use duration to filter 
  getOrders(userId: string, inputDurationWithStatus: DurationWithStatus): Observable<QuerySnapshot<DocumentData>> {
    console.log('service => duration getOrders: ');
    console.dir(inputDurationWithStatus);

       if(inputDurationWithStatus.status == 'ALL'){
          return this.db.collection('orders', 
            ref => ref.where('userId', '==', userId)
                  // .where('orderDate', '>=', inputDurationWithStatus.start)
                  // .where('orderDate', '<=', inputDurationWithStatus.end)
                  // .where('status', '==', inputDurationWithStatus.status)
                  // .orderBy( "orderDate", "desc" )
                  )
            .get();
       } else {
        return this.db.collection('orders', 
            ref => ref.where('userId', '==', userId)
                    // .where('orderDate', '>=', inputDurationWithStatus.start)
                    // .where('orderDate', '<=', inputDurationWithStatus.end)
                    .where('status', '==', inputDurationWithStatus.status)
                    // .orderBy( "orderDate", "desc" )
                    )
            .get();
       }
  }

  
  filterDate(order: Order, start: Date, end: Date) {
      const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
      const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
      const dd = new Date(order.orderDate);
      const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
      if ( d >= s && d <= e ) {
        return true;
      } else {
        return false;
      }
  }

  transforDate (date: Date): Date{
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
