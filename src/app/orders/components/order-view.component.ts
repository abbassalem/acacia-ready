import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { AddOrderItems } from '../../shop/actions/basket.actions';
import { Order } from '../../shop/models/order.model';
import { ShopState } from '../../shop/reducers';

@Component({
  selector: 'app-order-view',
  template: `
<br>
  <mat-expansion-panel  (opened)="open(id)" (closed)="panelOpenState = false"  style="width: 80%">
      <mat-expansion-panel-header>
          <img mat-card-sm-image style="width:20px;height:20px" *ngIf="thumbnail" [src]="thumbnail"/>
          &nbsp;&nbsp;&nbsp;&nbsp;Order Date:<b>{{ orderDate | date: 'dd/MM/yyyy:HH:mm' }}</b>
          &nbsp;&nbsp;&nbsp;&nbsp;Amount: <b>{{ amount | currency : 'EUR':'symbol':'1.2-2'}} </b>
          &nbsp;&nbsp;&nbsp;&nbsp;Delivery Date: <b>{{ deliveryDate | date: 'dd/MM/yyyy'}} </b>
          &nbsp;&nbsp;&nbsp;&nbsp;Delivery Time: <b>{{ deliveryTime }}</b>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Paid:&nbsp;<mat-checkbox width="20%" [checked]= "order.paid" [disabled]="true" color="accent" ></mat-checkbox>
          &nbsp;
    </mat-expansion-panel-header>
    <mat-action-row>
    <button mat-raised-button color="accent" (click) = "addToBasket('Items added to basket successfully')">
      <mat-icon>add_to_photos</mat-icon>Add to basket
    </button>
    </mat-action-row>

    <ng-template matExpansionPanelContent>
        <table mat-table [dataSource]="orderItems" class="mat-elevation-z8" style="min-width: 70%">

          <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef> Product Name </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
          </ng-container>

          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef> Price </th>
            <td mat-cell *matCellDef="let element"> {{element.price | number : '1.2-2'}} </td>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef> Quantity</th>
          <td mat-cell *matCellDef="let element"> {{element.quantity}} </td>
        </ng-container>

        <ng-container matColumnDef="subTotal">
          <th mat-header-cell *matHeaderCellDef> Sub Total </th>
          <td mat-cell *matCellDef="let element"> {{element.subTotal | number : '1.2-2'}} </td>
        </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

        </table>
    </ng-template>
</mat-expansion-panel>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px; 
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
    .mat-snack-bar-container {
      margin-top: 50px !important;
    }
  `,
  ],
})

export class OrderViewComponent {

  @Input()
  order: Order;

  orderItems: Array<OrderItem> = [];

  panelOpenState = false;
  
  displayedColumns: string[] = ['name', 'price', 'quantity', 'subTotal'];

  constructor(private store: Store<ShopState>, private snackBar: MatSnackBar) {
  }

  get id() {
    return this.order.id;
  }

  get orderDate() {
    return this.order.orderDate;
  }

  get deliveryDate() {
    return this.order.deliveryDate;
  }

  get deliveryTime() {
    return this.order.deliveryTime;
  }

  get status() {
    return this.order.status;
  }

  get amount() {
    return this.order.amount;
  }

  get thumbnail() {
    let img;
    switch (this.status) {
      case 'OPEN': img = 'check.png';
        break;

      case 'DELIVERED': img = 'up.png';
        break;

      case 'CANCELLED': img = 'cancel.png';
        break;

      case 'CLOSED': img = 'cancel.png';
        break;

      case 'ARCHIVED': img = 'archived.png';
        break;
    }
    return 'assets/images/' + img;
  }

  addToBasket(message: string) {
    let snackBarRef: MatSnackBarRef<any>;

    snackBarRef = this.snackBar.open(message,'Close',{ 
      duration: 4000,
      panelClass: ["snack-notification"],
      horizontalPosition: "center",
      verticalPosition: "top"
    });

    // snackBarRef.afterDismissed().subscribe ( () => {
    this.store.dispatch(new AddOrderItems(this.order.items));
    // });
  }

  loadItems() {
    let item: OrderItem;
    const inputItems = this.order.items;
    for (let i = 0; i < inputItems.length; i++) {
      item = {
        name: inputItems[i].product.name,
        price: inputItems[i].product.price,
        quantity: inputItems[i].quantity,
        subTotal: inputItems[i].product.price * inputItems[i].quantity
      };
      this.orderItems.push(item);
    }
  }

  open(id) {
    this.loadItems();
    this.panelOpenState = true;
  }
}


export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  subTotal: number;
}
// <a [routerLink]="['/orders', id]">
// <mat-card>
//   <mat-card-title-group>
//     <p>
//       <span matBadge="{{status}}" matBadgeOverlap="true"></span>
//       <img mat-card-sm-image *ngIf="thumbnail" [src]="thumbnail"/>
//     </p>
//     <mat-card-title>{{ orderDate | date: 'dd/MM/yyyy - hh:mm' }}</mat-card-title>
//   </mat-card-title-group>
//   <mat-card-footer align="end">
//     <p>Total Amount: <b>{{ amount | number : '1.2-2'}} </b></p>
//   </mat-card-footer>
// </mat-card>
// </a>
