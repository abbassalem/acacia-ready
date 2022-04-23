import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material';
import { PipesModule } from '../../shared/pipes';
import { OrderListComponent } from './order-list.component';
import { OrderViewComponent } from './order-view.component';
import { OrderSearchComponent } from './order-search.component';

export const ORDER_COMPONENTS = [
  OrderViewComponent,
  OrderSearchComponent,
  OrderListComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    PipesModule,
  ],
  declarations: ORDER_COMPONENTS,
  exports: ORDER_COMPONENTS,
})
export class OrderComponentsModule {}
