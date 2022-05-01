import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DurationWithStatus, Order } from '../../shop/models/order.model';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';
import * as fromOrderReducer from '../reducers/orders.reducer';
import { Load, Reset } from '../actions/orders.actions';
import { getUser } from 'src/app/reducers';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-order-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-order-list  (searching)="executeQuery($event)" 
            [userId]="loggedUserId" [orders]="orders$ | async">
    </app-order-list>
  `,
        
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }`]
})

export class OrderListPageComponent implements OnInit {

  orders$: Observable<Order[]>;
  selectedOrderId$: Observable<string>;
  loggedUserId: string;

  constructor(private authStore: Store<fromAuthReducer.State>, 
              private orderStore: Store<fromOrderReducer.OrderState>) {
  }

  ngOnInit(): void {  
    this.authStore.select(getUser).subscribe(user => {
      this.loggedUserId = user.uid;
    });
  }

  executeQuery(inputDurationWithStatus: DurationWithStatus) {
    let payload = {userId: this.loggedUserId, durationWithStatus: inputDurationWithStatus};
    this.orderStore.dispatch(new Reset);
    this.orderStore.dispatch(new Load(payload));
    this.orders$ =  this.orderStore.pipe(
      select(fromOrderReducer.getOrders),
      filter(value => value.length > 0),
      map( orders => {
          return orders;
      })
    );

  }
}
