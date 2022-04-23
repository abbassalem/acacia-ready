import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DurationWithStatus, Order } from '../../shop/models/order.model';

@Component({
  selector: 'app-order-list',
  template: `
  <app-order-search (searchWithDates)= "propagateSearch($event)"></app-order-search>
  <mat-accordion  style="min-width: 80%">
    <app-order-view  *ngFor="let order of orders" [order]="order"> </app-order-view>
  </mat-accordion>
`,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ],
})

export class OrderListComponent {

  @Output() searching = new EventEmitter<DurationWithStatus>() ;
  @Input() orders: Order[];
  nonFilteredOrders: Order[];

  constructor() {
  }

  propagateSearch(event: DurationWithStatus) {
    console.log('in order-list  clicked');
    this.searching.emit(event);
  }

  // filterDate(order: Order, start: Date, end: Date) {
  //     const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  //     const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  //     const dd = new Date(order.orderDate);
  //     const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
  //     if ( d >= s && d <= e ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  // }
}