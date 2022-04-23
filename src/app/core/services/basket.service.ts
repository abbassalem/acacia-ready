import { Injectable, OnInit } from '@angular/core';

@Injectable()
export class BasketService implements OnInit {

  // TODO: this service is to be removed 

  // order: Order = {id:'',
  // orderDate: new Date(),
  // deliveryDate: new Date(),
  // deliveryTime: '',
  // deliveryAddress: '',
  // status: OrderStatus.OPEN,
  // items: [],
  // userId: '',
  // paid: false,
  // amount: 0
  // }

  // order$: BehaviorSubject<Order> = new BehaviorSubject<Order>(this.order);
  // userId: string;
  // history: Order[];
  // orders: Order[];
  // placedOrderSuccess = false;

  // constructor(private db: AngularFirestore) {
  // }

  ngOnInit(): void {
  }

//   saveOrder(order: Order): Promise<DocumentReference> {
//     return this.db.collection('orders').add(this.order);
//  }

}


//   function productAlreadyAddedToBasket(): void {
  //     for ( let catIndex = 0; catIndex < self.categories.length; catIndex++) {
  //       const cat = self.categories[catIndex];
  //       for ( let prodIndex = 0; prodIndex < cat.products.length; prodIndex++) {
  //         cat.products[prodIndex].addedToBasket = false;
  //       }
  //     }
  //   }