import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { OrderListPageComponent } from './containers/order-list-page.component';
import { OrdersEffects } from './effects/orders.effects';
import { OrderService } from './services/orders.service';
import { reducer } from './reducers/orders.reducer';
import { OrderSearchComponent } from './components/order-search.component';
import { OrderListComponent } from './components/order-list.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: OrderListPageComponent}
    ]),
    StoreModule.forFeature('orders', reducer ),
    EffectsModule.forFeature([OrdersEffects])
  ],
  declarations: [
    OrderListPageComponent ,
    OrderSearchComponent,
    OrderListComponent 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [OrdersEffects,OrderService]
})
export class OrdersModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: OrdersModule,
      providers: [],
    };
  }
}