import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import * as fromBasketActions from '../actions/basket.actions';
import * as fromCategoryActions from '../actions/category.actions';
import { BasketItem } from '../models/BasketItem.model';
import { Category } from '../models/category.model';
import * as fromCategories from '../reducers/categories.reducer';
import * as index from './../reducers/index';

@Component({
  selector: 'app-product-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  
    <app-list-product
        [categories$]="categories$.asObservable()"
        [currentTabIndex] = "currentCategoryIndex"
        (changeCategoryIndex)="setCurrentCategoryIndex($event)"
        [basketItems]="basketItems$ | async"
        [routeLinks]="routeLinks">
    </app-list-product>
  `,
  styles: [
    ` .mat-tab-label-active {
      background-color: #5EADB0;
      color: #D5FEFF;
      border: 1px solid #6B7F7F;
      font-weight: bold;
  }
  .mat-tab-link,
  .mat-tab-label {
      line-height: 30px !important;
      height: 30px !important;
      min-width: 100px !important;
      border: 1px solid #7e7e7e;
  }
  .tabContentContainer {
      border: 1px solid #aaaaaa;
      background: #ffffff 50% 50% repeat-x;
  }`
  ]
})

export class ProductListPageComponent implements OnInit {

  routeLinks: Array<{catId: number, label: string, path: string}> = new Array();
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject(null);
  basketItems$: Observable<BasketItem[]>;

  selectedCategoryId: number;
  currentCategoryIndex: number = 0;
  
  constructor(private store: Store<fromCategories.CategoryState>, private route: ActivatedRoute) {
  }

  ngOnInit() {

    this.store.dispatch(new fromCategoryActions.Load);
    this.store.dispatch(new fromBasketActions.Load());
    this.store.select(index.getAllCategories).subscribe( cats => {
        this.categories$.next(cats);
        cats.forEach((cat, i) => 
            this.routeLinks.push({catId: cat.id, label: cat.name, path: '/shop/categories/' + i}));
        this.selectedCategoryId  = this.routeLinks[this.currentCategoryIndex].catId;
        this.store.dispatch(new fromCategoryActions.Select(this.selectedCategoryId))
    });

    this.route.paramMap.subscribe( params => {
        this.currentCategoryIndex = +params.get('id');
        console.log('pathVariable : ' + this.currentCategoryIndex);
        if( this.routeLinks[this.currentCategoryIndex].catId ) {
          this.selectedCategoryId  = this.routeLinks[this.currentCategoryIndex].catId;
          console.log('selectedCategoryId router: ' + this.selectedCategoryId );
          this.store.dispatch(new fromCategoryActions.Select(this.selectedCategoryId));
        }
    });
    this.basketItems$ = this.store.pipe(select(index.getAllBasketItems));
  }

  setCurrentCategoryIndex(index: number) {
    console.log('EventEmitter catid: ' + index);
    this.currentCategoryIndex = index;
  }  
}

  