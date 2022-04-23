import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Order } from '../../shop/models/order.model';
import { OrderService } from '../services/orders.service';
import * as fromOrderActions from '../../orders/actions/orders.actions';
import * as fromOrderReducer from '../../orders/reducers/orders.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import * as fromBasketReducer from './../../shop/reducers/basket.reducer';
import * as fromBasketActions from './../../shop/actions/basket.actions';
import { Store } from '@ngrx/store';
import { DocumentData } from '@angular/fire/compat/firestore';
import { Product } from 'src/app/shop/models/product.model';
import { CREATE_EFFECT_METADATA_KEY } from '@ngrx/effects/src/models';

@Injectable()
export class OrdersEffects {

  constructor(private actions$: Actions, 
        private orderService: OrderService, 
        private snackBar: MatSnackBar,
        private basketStore: Store<fromBasketReducer.BasketState>, 
        private orderStore: Store<fromOrderReducer.OrderState>, 
        private router: Router) {
  }
  
  
  saveOrder$ = createEffect( () => {
    return this.actions$.pipe(
          ofType<fromOrderActions.SaveOrder>(fromOrderActions.OrderActionTypes.SaveOrder),
          map(action => action.payload),
          switchMap( (order: Order) => {
            console.log('before saving...');
            console.dir(order);
            return this.orderService.saveOrder(order);
          }),
          map( orderRef => {
            let saved = {};
            console.log('orderref: ');
            console.dir(orderRef);
            console.log('saved ID: ' + orderRef.id);
            orderRef.get().then(
              docData => { 
                console.log('inside docDate');
                console.dir(docData);
                Object.assign(saved,docData.data(), {id:docData.id});
                console.log('saved object');
              console.dir(saved);
              })
              return new fromOrderActions.SaveOrderComplete(<Order>saved);
            }
          ),
          catchError (error => of(error))
          )
  });

  // saveOrderSuccess$ =  createEffect( () => {
  //   return this.actions$.pipe(
  //       ofType<fromOrderActions.SaveOrderComplete>(fromOrderActions.OrderActionTypes.SaveOrderComplete),
  //       switchMap( action => {
  //           console.log('saveOrderSuccess');
  //           console.dir(action.payload);
  //           this.snackBar.open('Order saved successfully.');
  //           this.basketStore.dispatch(new fromBasketActions.RemoveAll());
  //           this.orderStore.dispatch(new fromOrderActions.Reset());
  //           return this.router.navigate(['/']);
  //       })
  //     )
  //   });
  

  getAllOrders$ = createEffect( () => {
    let resOrders: any;
    return this.actions$.pipe(
      ofType<fromOrderActions.Load>(fromOrderActions.OrderActionTypes.Load),
      switchMap( action => {
        let res: Order[];
        return this.orderService.getOrders(action.payload.userId, action.payload.durationWithStatus)
        .pipe(
          map( q => {
              resOrders =  q.docs.map( doc => (doc.data)); 
              return new fromOrderActions.LoadComplete(resOrders);
          }),
          catchError(err => of(new fromOrderActions.LoadError('error in loading orders'))
          )
        )
      })
    )
  });

  // transforToOrder(doc: QueryDocumentSnapshot<DocumentData> ): Order{
  //   let retDoc: Array<Order> = new Array() ;
  //   let id:string;
  //   return <Order>doc.data();
    // docs.forEach((doc) => {
      // retDoc.push(<Order>Object.assign(doc.data(), {id: doc.id}));
    // })
    // return retDoc;
  // }

//   @Effect()
// loadBasket$: Observable<Action> = this.actions$
// .ofType<fromOrdersActions.Load>(fromOrdersActions.OrderActionTypes.Load).pipe(
//   switchMap( () => {
//     return Observable.create (observer => {
//       const timeoutId = setTimeout(() => {
//         observer.next(new fromOrdersActions.LoadComplete(this.orders));
//         observer.error(of(new fromOrdersActions.LoadError('error in loading orders')));
//         observer.complete();
//       }, 200);
//       return () => clearTimeout(timeoutId);
//     });
//   }));

// @Effect()
//   copyOrder$: Observable<Action> = this.actions$.pipe(
//     ofType<fromOrdersActions.Addorder>(fromOrdersActions.BasketActionTypes.Addorder),
//     map( action => action.payload),
//     switchMap( (order: order) =>  {
//       const index = this.products.findIndex(product => product.id === order.id);
//       if (index > 0) {
//           this.products[index] = order;
//       } else {
//           this.products.push(order);
//       }
//       window.localStorage.setItem('products', JSON.stringify(this.products));
//       return of(new fromOrdersActions.AddorderComplete(order));
//     }
//   )
// );

}
