import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { BasketItem } from '../models/BasketItem.model';
import * as fromBasketActions from './../actions/basket.actions';

import { BasketService } from 'src/app/core/services/basket.service';
import { Router } from '@angular/router';


@Injectable()
export class BasketEffects {

  products: BasketItem[];

  constructor(private actions$: Actions, private basketService: BasketService, 
        private router: Router) {
    if (window.localStorage) {
      this.products = JSON.parse(window.localStorage.getItem('products'));
      if (!this.products) {
        this.products = [];
        // TODO: uncomment the next line
        // window.localStorage.setItem('products', JSON.stringify(this.products));
      }
    } else {
      console.log('locaStorage not supported');
    }
  }

  

  @Effect()
  addOrderItemsToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.AddOrderItems>(fromBasketActions.BasketActionTypes.AddOrderItems),
    map(action => action.payload),
    switchMap((basketItems: BasketItem[]) => {
      basketItems.forEach(bi => this.products.push(bi));
      // window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.AddOrderItemsComplete(basketItems));
    }
    )
  );

  @Effect({dispatch: true})
  addProductToBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.AddBasketItem>(fromBasketActions.BasketActionTypes.AddBasketItem),
    map(action => action.payload),
    switchMap((basketItem: BasketItem) => {
        const index = this.products.findIndex(product => product.id === basketItem.id);
        if (index > 0) {
          this.products[index] = basketItem;
        } else {
          this.products.push(basketItem);
        }
        // window.localStorage.setItem('products', JSON.stringify(this.products));
        return of(new fromBasketActions.AddBasketItemComplete(basketItem));
    }
    )
  );

//  @Effect({dispatch: false})
//  addBasketItemComplete$: Observable<Action> = this.actions$.pipe(
//     ofType<fromBasketActions.AddBasketItemComplete>(fromBasketActions.BasketActionTypes.AddBasketItemComplete),
//     switchMap((action: Action) => {
//     }
//     )
//   );

  @Effect()
  removeProductFromBasket$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.RemoveBasketItem>(fromBasketActions.BasketActionTypes.RemoveBasketItem),
    map(action => action.payload),
    switchMap((id: number) => {
      const index = this.products.findIndex(product => product.id === id);
      window.localStorage.removeItem('products');
      this.products.splice(index, 1);
      // window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.RemoveBasketItemComplete(id));
    }
    )
  );

  @Effect()
  updateBasketItem$: Observable<Action> = this.actions$.pipe(
    ofType<fromBasketActions.UpdateBasketItem>(fromBasketActions.BasketActionTypes.UpdateBasketItem),
    map(action => action.payload),
    switchMap((basketItem: BasketItem) => {
      const index = this.products.findIndex(product => product.id === basketItem.id);
      window.localStorage.removeItem('products');
      this.products[index] = basketItem;
      // window.localStorage.setItem('products', JSON.stringify(this.products));
      return of(new fromBasketActions.UpdateBasketItemComplete(basketItem));
    }
    )
  );

  // @Effect({dispatch: false})
  // removeAll$: Observable<Action> = this.actions$.pipe(
  //   ofType<fromBasketActions.RemoveAll>(fromBasketActions.BasketActionTypes.RemoveAll),
  //   tap( () => {
  //     //this.router.navigate(['/']);
  //   })
  // );

}
