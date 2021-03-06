import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import * as fromCategoryActions from './../actions/category.actions';
import * as fromCategories from './../reducers/categories.reducer';
import { BasketItem } from '../models/BasketItem.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-product',
  template: `
  <mat-toolbar>
  <span class="toolbar-flex">
      <nav mat-tab-nav-bar >
        <a mat-tab-link
            *ngFor="let routeLink of routeLinks; let i=index"
              [routerLink]="routeLink.path"
              routerLinkActive #rla="routerLinkActive"
              [active]="i === currentTabIndex">
              {{routeLink.label}}
        </a>
      </nav>
    </span>
</mat-toolbar>

<app-product-view  *ngFor="let product of products" [product]="product" [quantity]="getQuantity(product.id)">
</app-product-view>
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

export class ProductListComponent implements OnInit, OnChanges {

  categories: Category[];
  @Input() categories$: Observable<Category[]>;
  @Input() basketItems: BasketItem[];
  @Input() currentTabIndex = 0 ;
  @Input() routeLinks: Array<{ catId: string, label: string, path: string }>;
  @Output() changeCategoryIndex: EventEmitter<number> = new EventEmitter();

  products: Product[];

  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.categories$.subscribe( cats => {
      this.categories = cats;

      if (this.categories[this.currentTabIndex]) {
        console.log('onInit-currentTabIndex: ' + this.currentTabIndex);
        this.products = cats[this.currentTabIndex].products;
        this.changeCategoryIndex.emit(this.currentTabIndex);
      }
      });
   
   }

   ngOnChanges(changes: SimpleChanges): void {

    if (this.categories && this.categories[this.currentTabIndex]) {
      console.log('onchanges-currentTabIndex: ' + this.currentTabIndex);
      this.products = this.categories[this.currentTabIndex].products;
      this.changeCategoryIndex.emit(this.currentTabIndex);
    }

   }

  getQuantity(prodId: number) {
    let qty = undefined;
    if (this.basketItems) {
      qty = this.basketItems.find(item => item.id === prodId)
      if (qty) {
        return qty.quantity;
      } else {
        return 0;
      }
    }
  }
}
