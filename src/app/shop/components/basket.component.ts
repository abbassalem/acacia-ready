import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
// import { AngularFireFunctions  } from '@angular/fire/compat/functions';
// import { Stripe } from 'stripe';
import { environment } from 'src/environments/environment';
import { fadeInItems } from '@angular/material/menu';

// declare var Stripe;

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Input() basketItems: BasketItem[];
  @Input() deliveryTimes: Array<string>;
  // afFun.useEmulator("localhost", 5001);

  product = null;
  stripeStatus = '';

  paymentHandler:any = null;

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
              // private afFun: AngularFireFunctions,
              private authStore: Store<fromAuth.State> ) {

        // afFun.useEmulator("localhost", 5001);
        this.product = null;
        this.stripeStatus = '';
        
  }

  ngOnInit() {

    this.invokeStripe();

    this.loggedIn$ = this.authStore.pipe(select(fromRoot.isLoggedIn));
    this.authStore.pipe(select(fromRoot.getUser)).subscribe(user => {
      if(user){
        this.loggedUser = user;
      }
    });
    this.quantityControl = this.fb.control(null, [Validators.required]);
      
    this.basketForm = this.fb.group({
        deliveryGroup: this.fb.group({
            deliveryTime: this.fb.control('07:00', Validators.required),
            deliveryDate: this.fb.control(new Date(), Validators.required),
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
        }),
        paymentGroup: this.fb.group({
            emailForReceipt: this.fb.control('')
        })
    });
    
    if(this.loggedUser){
      this.basketForm.controls['contactGroup'].get('email').setValue(this.loggedUser.email);
      this.basketForm.controls['contactGroup'].get('telephone').setValue('07812329253');
      // this.basketForm.controls['contactGroup'].get('telephone').setValue(this.loggedUser.phoneNumber);
    }

  }

  initializePayment() {
   
    this.saveOrder();
   const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: stripeToken =>  {
        console.log({stripeToken})
        // alert('Stripe token generated!');
        this.order.paid = true;
        this.store.dispatch(new fromOrderActions.SaveOrder(this.order));
      }
    });
  
    paymentHandler.open({
      name: 'Order Date: '  + new Date(this.order.orderDate).toLocaleDateString(),
      // name: 'this.order.orderDate.toLocaleString()',
      description: this.order.items.map(item => item.product.name).join(', '),
      amount: this.order.amount * 100
    });
  }
  
  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            // alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
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


      // this.store.dispatch(new fromOrderActions.SaveOrder(this.order));

      // this.checkoutFirebase(123);


  }

//   checkoutFirebase(productId: number): void {
//     console.log('checking out with item id: ' + productId);

//     var stripe = Stripe(environment.stripe.key);

//     this.afFun.httpsCallable("stripeCheckout")({ id: productId })
//         .subscribe(result => {
//             console.log({ result });

//             stripe.redirectToCheckout({
//                 sessionId: result,
//             }).then(function (result) {
//                 console.log(result.error.message);
//             });
//         });
// }

  getTotal() {
    return this.basketItems.map(
      (item, index) => {
        if (index === this.selectedIndex) {
          return (item.product.price * this.quantityControl.value);
        } else {
          return (item.product.price * item.quantity);
        }
      })
      .reduce((acc, val) => acc + val, 0);
  }

  // toggleShowSteps() {
  //   this.showSteps = !this.showSteps;
  // }

  modify(index: number) {
    if (this.edit) {
      return;
    }
    this.quantityInitialValue = this.basketItems[index].quantity;
    this.operation = OperationType.EDIT;
    this.edit = true;
    this.selectedIndex = index;
    this.quantityControl.setValue(this.basketItems[index].quantity);
    this.showSteps = false;
  }

  delete(index: number) {
    if (this.edit) {
      return;
    }
    this.operation = OperationType.DELETE;
    this.edit = true;
    this.selectedIndex = index;
    this.showSteps = false;
  }

  saveBasketItem() {
    // this.showSteps = true;
    switch (this.operation) {
      case OperationType.EDIT: {
        const clone = Object.assign({}, this.basketItems[this.selectedIndex]);
        clone.quantity = this.quantityControl.value;
        this.store.dispatch(new fromBasketActions.UpdateBasketItem(clone));
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
