import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { OrderComponentsModule } from './components';
import { OrderListPageComponent } from './containers/order-list-page.component';
import { OrdersEffects } from './effects/orders.effects';
import { OrderService } from './services/orders.service';
import { reducer } from './reducers/orders.reducer';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    OrderComponentsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: OrderListPageComponent}
    ]),
    StoreModule.forFeature('orders', reducer ),
    EffectsModule.forFeature([OrdersEffects]),
  ],
  declarations: [
    OrderListPageComponent  ],
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