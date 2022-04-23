import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCategoryActions from '../actions/category.actions';
import { Product } from '../models/product.model';
import * as fromCategoryReducer from '../reducers/categories.reducer';
import * as index from '../reducers/index';


@Component({
  selector: 'app-product-view-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-product-selected-page [product]="product"></app-product-selected-page>
  `,
})

export class ProductViewPageComponent implements OnInit, OnDestroy {

  product: Product;
  quantity: number;

  constructor(private store: Store<fromCategoryReducer.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        const id = +params['productId'];
        this.store.dispatch(new fromCategoryActions.SelectProduct(id));
        this.store.pipe(select(index.getSelectedProduct)).subscribe(value => this.product = value);
      });
      this.route.queryParamMap.subscribe(( params => {
        this.quantity = +params.get('quantity');
      }));
  }

  ngOnDestroy() {
  }

}