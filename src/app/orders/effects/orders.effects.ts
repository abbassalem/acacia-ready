import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Order, Payment } from '../../shop/models/order.model';
import { OrderService } from '../services/orders.service';
import * as fromOrderActions from '../../orders/actions/orders.actions';
import * as fromOrderReducer from '../../orders/reducers/orders.reducer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as fromBasketReducer from './../../shop/reducers/basket.reducer';
import * as fromBasketActions from './../../shop/actions/basket.actions';
import { Store } from '@ngrx/store';

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
          switchMap( (action: fromOrderActions.SaveOrder) => 
            this.orderService.saveOrder(action.payload)
          ),
          map( (order) => {
              return new fromOrderActions.SaveOrderComplete(<Order>order);
            }),
          catchError (error => of(error))
          )
  }, {dispatch: true}
  );

  saveOrderSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromOrderActions.SaveOrderComplete>(fromOrderActions.OrderActionTypes.SaveOrderComplete),
        switchMap( (action) => {
            this.snackBar.open('Order & Payment  success.', 'Close',{
            duration: 5000,
            panelClass: ["snack-notification"],
            horizontalPosition: "center",
            verticalPosition: "top"
            });

            this.basketStore.dispatch(new fromBasketActions.RemoveAll());
            this.orderStore.dispatch(new fromOrderActions.Reset());
            return this.router.navigate(['/']);
        })          
      )
  }, { dispatch: false });
  
  payment$ = createEffect( () => {
    return this.actions$.pipe(
          ofType<fromOrderActions.SavePayment>(fromOrderActions.OrderActionTypes.SavePayment),
          switchMap( (action: fromOrderActions.SavePayment) => 
            this.orderService.savePayment(action.payload)
          ),
          map( (payment) => {
              return new fromOrderActions.SavePaymentComplete(<Payment>payment);
            }),
          catchError (error => of(error))
          )
  }, {dispatch: true}
  );

  paymentSuccess$ =  createEffect( () => {
    return this.actions$.pipe(
        ofType<fromOrderActions.SaveOrderComplete>(fromOrderActions.OrderActionTypes.SavePaymentComplete),
        switchMap( (action) => {
            // this.snackBar.open('Order & Payment  success.', 'Close',{
            // duration: 5000,
            // panelClass: ["snack-notification"],
            // horizontalPosition: "center",
            // verticalPosition: "top"
            // });
            // this.basketStore.dispatch(new fromBasketActions.RemoveAll());
            // this.orderStore.dispatch(new fromOrderActions.Reset());
            // return this.router.navigate(['/']);
            return null;
        })          
      )
    }, { dispatch: false });
  

  getAllOrders$ = createEffect( () => {
    let resOrders: any;
    return this.actions$.pipe(
      ofType<fromOrderActions.Load>(fromOrderActions.OrderActionTypes.Load),
      switchMap( action => {
        return this.orderService.getOrders(action.payload.userId, action.payload.orderSearchCriteria)
        .pipe(
          map( q => {
              resOrders =  q.docs.map( 
                doc => {
                  return doc.data();
                });
                return new fromOrderActions.LoadComplete(resOrders);
            }),
          catchError(err => of(new fromOrderActions.LoadError('error in loading orders'))
          )
        )
      })
    )
  });

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
