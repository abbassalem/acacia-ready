import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as BasketActions from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';
import * as fromRoot from '../../../app/reducers/index';
import { BasketState } from '../reducers/basket.reducer';
import * as index from '../reducers/index';
import * as fromConfigActions from '../../core/actions/configuration.actions';
import * as fromConfigReducer from '../../core/reducers/configuration.reducer';


@Component({
  selector: 'app-basket-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <app-basket [basketItems]="basketItems$ | async" [deliveryTimes]="deliveryTimes$ | async"> </app-basket>
  `,
  styles: [
  ],
})

export class BasketPageComponent implements OnInit {

  basketItems$: Observable<BasketItem[]>;
  deliveryTimes$: Observable<Array<string>>;
  // loggedIn$: Observable<boolean>;

  constructor(private store: Store<BasketState>, private rootStore: Store<fromRoot.State> ) {
    this.basketItems$ = this.store.pipe(select(index.getAllBasketItems));
    this.rootStore.dispatch(new fromConfigActions.LoadDeliveryTimes());
    this.deliveryTimes$ = this.rootStore.pipe(select(fromRoot.getDeliveryTimes));
    // this.loggedIn$ = this.store.pipe(select (fromRoot.isLoggedIn));
  }

  ngOnInit() {
    //TODO: move from constructor to the init method
    // this.basketItems$ = this.store.pipe(select(index.getAllBasketItems));
    // this.deliveryTimes$ = this.store.pipe(select(fromRoot.getDeliveryTimes));
    // this.store.pipe(select(fromRoot.getDeliveryTimes)).subscribe ( times =>
    //   this.deliveryTimes = times
    // );
  }
}
