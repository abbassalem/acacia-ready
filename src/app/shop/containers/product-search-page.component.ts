// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { select, Store } from '@ngrx/store';
// import { Observable, of } from 'rxjs';
// import { take } from 'rxjs/operators';

// import * as ProductActions from '../actions/product.actions';
// import { Product } from '../models/product.model';
// import * as fromProducts from '../reducers';

// @Component({
//   selector: 'app-product-search-page',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   template: `
//   <app-list-product [products]="products$ | async"></app-list-product>
//   `,
// })

   
  
// export class ProductSearchPageComponent {
//   searchQuery$: Observable<string>;
//   products$: Observable<Product[]>;
//   loading$: Observable<boolean>;
//   error$: Observable<string>;

//   constructor(private store: Store<fromProducts.State>) {
//     // this.searchQuery$ = store.pipe(select(fromProducts.getSearchQuery), take(1));
//     // this.products$ = store.pipe(select(fromProducts.getSearchResults));
//     // this.loading$ = store.pipe(select(fromProducts.getSearchLoading));
//     // this.error$ = store.pipe(select(fromProducts.getSearchError));
//   }

//   search(query: string) {
//     this.store.dispatch(new ProductActions.Search(query));
//   }
// }
