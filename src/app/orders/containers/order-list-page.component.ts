import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuthReducer from '../../../app/auth/reducers/auth.reducer';
import { Observable } from 'rxjs';
import { OrderSearchCriteria, Order } from '../../shop/models/order.model';
import * as fromOrderReducer from '../reducers/orders.reducer';
import { Load, Reset } from '../actions/orders.actions';
import { getUser } from 'src/app/reducers';

@Component({
  selector: 'app-order-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <app-order-search (searchCriteriaChange)= "executeQuery($event)"  >
  </app-order-search>

    <app-order-list  [orderList]="orders$ | async">
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
      console.log('userId: ' + this.loggedUserId);
    });
  }
  
  executeQuery(orderSearchCriteria: OrderSearchCriteria) {
    let payload = { userId:this.loggedUserId,orderSearchCriteria: orderSearchCriteria};
    this.orderStore.dispatch(new Reset);
    this.orderStore.dispatch(new Load(payload));
    this.orders$ = this.orderStore.select(fromOrderReducer.getOrders);
  }
}
