import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BasketService } from '../core/services/basket.service';
import { ProductService } from '../core/services/product.service';
import { MaterialModule } from '../material';
import { BasketComponent } from './components/basket.component';
import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-selected.component';
import { ProductViewComponent } from './components/product-view.component';
import { BasketPageComponent } from './containers/basket-page.component';
import { ProductListPageComponent } from './containers/product-list-page.component';
import { ProductSelectedPageComponent } from './containers/product-selected-page.component';
import { ProductViewPageComponent } from './containers/product-view-page.component';
import { BasketEffects } from './effects/basket.effects';
import { ProductEffects } from './effects/product.effects';
import { reducers } from './reducers';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'categories/0', pathMatch: 'full'},
      { path: 'categories/:id', component: ProductListPageComponent},
      { path: 'products/:productId', component: ProductViewPageComponent},
      { path: 'basket', component: BasketPageComponent}
    ]),

    StoreModule.forFeature('shop', reducers),
    EffectsModule.forFeature([ProductEffects, BasketEffects]),
  ],
  declarations: [
    ProductSelectedPageComponent,
    ProductViewPageComponent,
    ProductListPageComponent,
    BasketPageComponent,
    ProductListComponent,
    ProductViewComponent,
    ProductDetailComponent,
    BasketComponent
  ]
})

export class ShopModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: ShopModule,
      providers: [ProductService, BasketService]
    };
  }
}