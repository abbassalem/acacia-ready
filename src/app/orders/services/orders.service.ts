import { Injectable } from '@angular/core';
import { Order, OrderSearchCriteria, Payment} from '../../shop/models/order.model';
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

    async savePayment(payment: Payment): Promise<Payment> {
      let saved: Payment;  
      let docRef = await this.db.collection('payments').add(payment);
      let docData = <Payment> await (await docRef.get()).data();
      saved = Object.assign({id: docRef.id}, docData);
      this.db.collection('payments').doc(docRef.id).set({id: docRef.id}, {merge:true});
      return saved;  
    }

  getOrders(userId: string, orderSearchCriteria: OrderSearchCriteria): Observable<QuerySnapshot<DocumentData>> {
       if(orderSearchCriteria.status == 'ALL'){
          return this.db.collection('orders', 
            ref => ref.where('userId', '==', userId)
                  // .where('orderDate', '>=', orderSearchCriteria.start)
                  // .where('orderDate', '<=', orderSearchCriteria.end)
                  // .where('status', '==', inputDurationWithStatus.status)
                  // .orderBy( "orderDate", "desc" )
                  )
            .get();
       } else {
        return this.db.collection('orders', 
            ref => ref.where('userId', '==', userId)
                    // .where('orderDate', '>=', orderSearchCriteria.start)
                    // .where('orderDate', '<=', orderSearchCriteria.end)
                    .where('status', '==', orderSearchCriteria.status)
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
