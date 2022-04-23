import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user';
import * as fromAuth from '../../auth/reducers/auth.reducer';
import * as fromRoot from '../../reducers';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromOrderActions from '../../orders/actions/orders.actions';
import { BasketItem } from '../models/BasketItem.model';
import { Order, OrderStatus } from '../models/order.model';
import { OrderState } from 'src/app/orders/reducers/orders.reducer';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Input() basketItems: BasketItem[];
  @Input() deliveryTimes: Array<string>;

  order: Order;
  loggedUser: User;
  edit = false;
  operation: OperationType = OperationType.NONE;
  selectedIndex = -1;
  quantityControl: FormControl;
  quantityInitialValue = 0;
  basketForm: FormGroup;
  showSteps = false;
  isLinear = false;
  columns = [
    { field: 'name', label: 'Name', visible: true },
    { field: 'description', label: 'Description', visible: true },
    { field: 'price', label: 'Price', visible: true },
    { field: 'quantity', label: 'Quantity', visible: true },
    { field: 'subtotal', label: 'Subtotal', visible: true },
  ];

  loggedIn$: Observable<boolean>;
  addressOption$: Observable<any>;

  constructor(private store: Store<OrderState>,
              private location: Location,
              private fb: FormBuilder,
              private authStore: Store<fromAuth.State>,
              private snakBar: MatSnackBar ) {
  }

  ngOnInit() {

    this.loggedIn$ = this.authStore.pipe(select(fromRoot.isLoggedIn));
    this.authStore.pipe(select(fromRoot.getUser)).subscribe(user => {
      if(user){
        this.loggedUser = user;
      }
    });
    this.quantityControl = this.fb.control(null, [Validators.required]);
      
    this.basketForm = this.fb.group({
        deliveryGroup: this.fb.group({
            deliveryTime: this.fb.control('', Validators.required),
            deliveryDate: this.fb.control('', Validators.required),
            addressOption: this.fb.control(1, Validators.required)
        }),
        // addressGroup: this.fb.group({
        //     street: this.fb.control(''),
        //     city: this.fb.control(''),
        //     postCode: this.fb.control('',)
        // }),
        contactGroup: this.fb.group({
            email: this.fb.control('', Validators.required),
            telephone: this.fb.control('8989', Validators.required)
        })
    });
    
    if(this.loggedUser){
      this.basketForm.controls['contactGroup'].get('email').setValue(this.loggedUser.email);
      this.basketForm.controls['contactGroup'].get('telephone').setValue(this.loggedUser.phoneNumber);
    }
  }

  saveOrder(): void {
      this.order = {
        deliveryDate: this.basketForm.controls['deliveryGroup'].get('deliveryDate').value.getTime(),
        deliveryTime: this.basketForm.controls['deliveryGroup'].get('deliveryTime').value,
        // deliveryAddress: (!this.basketForm.controls['addressGroup'].disabled)? this.basketForm.controls['addressGroup'].value: '',
        orderDate: new Date().getTime(),
        status: OrderStatus.OPEN,
        items: this.basketItems,
        userId: this.loggedUser.uid,
        paid: false,
        amount: this.getTotal()
      };
      this.store.dispatch(new fromOrderActions.SaveOrder(this.order));
  }

  getTotal() {
    return this.basketItems.map(
      (item, index) => {
        if (index === this.selectedIndex) {
          return (item.product.price * this.quantityControl.value);
        } else {
          return (item.product.price * item.quantity);
        }
      })
      .reduce((acc, value) => acc + value, 0);
  }

  toggleShowSteps() {
    this.showSteps = !this.showSteps;
  }

  modify(index: number) {
    if (this.edit) {
      return;
    }
    this.quantityInitialValue = this.basketItems[index].quantity;
    this.operation = OperationType.EDIT;
    this.edit = true;
    this.selectedIndex = index;
    this.quantityControl.setValue(this.basketItems[index].quantity);
  }

  delete(index: number) {
    if (this.edit) {
      return;
    }
    this.operation = OperationType.DELETE;
    this.edit = true;
    this.selectedIndex = index;
  }

  save() {
    switch (this.operation) {
      case OperationType.EDIT: {
        const clone = Object.assign({}, this.basketItems[this.selectedIndex]);
        clone.quantity = this.quantityControl.value;
        this.store.dispatch(new fromBasketActions
          .UpdateBasketItem(clone));
        break;
      }
      case OperationType.DELETE: {
        this.store.dispatch(new fromBasketActions
          .RemoveBasketItem(this.basketItems[this.selectedIndex].id));
        break;
      }
    }

    this.selectedIndex = -1;
    this.operation = OperationType.NONE;
    this.edit = false;
  }

  cancel() {
    this.quantityControl.setValue(this.basketItems[this.selectedIndex].quantity);
    this.selectedIndex = -1;
    this.operation = OperationType.NONE;
    this.edit = false;
  }

  back() {
    this.location.back();
  }
}

export enum OperationType {
  NONE = 'NONE',
  DELETE = 'DELETE',
  EDIT = 'EDIT'
}
