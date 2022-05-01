import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderActionTypes, OrderActionsUnion } from '../actions/orders.actions';
import { Order } from '../../shop/models/order.model';

export interface OrderState extends EntityState<Order> {
  selectedOrderId: string | null;
  savedOrder: Order;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>({
  selectId: (order: Order) => order.id,
  sortComparer: sortByOrder,
});

export function sortByOrder(ob1: Order, ob2: Order): number {
  const value = ob1.id == ob2.id ? 1 : 0;
  return value;
}

export const initialState: OrderState = adapter.getInitialState({
  selectedOrderId: null,
  savedOrder: null
});

export const selectOrderState = createFeatureSelector<OrderState>('orders');

export function reducer(state = initialState, action: OrderActionsUnion): OrderState {
  switch (action.type) {

    case OrderActionTypes.Reset: {
      return initialState;
    }

    case OrderActionTypes.SaveOrder: {
      return state;
    }

    case OrderActionTypes.SaveOrderComplete: {
      return {
        ...state, savedOrder: action.payload
      }
    }

    case OrderActionTypes.SaveOrderError: {
      return state;
    }

    case OrderActionTypes.Load: {
      return state;
    }

    case OrderActionTypes.LoadComplete: {
      return adapter.addMany(action.payload, state);
    }

    case OrderActionTypes.LoadError: {
      return state;
    }

    case OrderActionTypes.Select: {
      return {
        ...state,
        selectedOrderId: action.payload
      };
    }
    default: {
      return state;
    }
    // case OrderActionTypes.Select: {
    //   return {
    //     ...state,
    //     selectedOrderId: action.payload
    //   };
    // }
  }
}

export const getSavedOrder = createSelector(selectOrderState, (state: OrderState) => state.savedOrder);
export const getEntities = createSelector(selectOrderState, (state: OrderState) => state.entities);
export const getIds = createSelector(selectOrderState, (state: OrderState) => state.ids);

export const getOrders = createSelector(getEntities, getIds, (entities, ids) => {
  let orders: Array<Order> = new Array<Order>();
  for (let id of ids) {
    orders.push(entities[id]);
  }
  return orders;
})
// filterDate(order: Order, start: Date, end: Date) {
  //     const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  //     const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  //     const dd = new Date(order.orderDate);
  //     const d = new Date(dd.getFullYear(), dd.getMonth(), dd.getDate());
  //     if ( d >= s && d <= e ) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  // }