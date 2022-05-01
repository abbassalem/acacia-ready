import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { BasketActionsUnion, BasketActionTypes } from '../actions/basket.actions';
import { BasketItem } from '../models/BasketItem.model';

export interface BasketState extends EntityState<BasketItem> {
  selectedBasketItemId: number | null;
}

export function sortByBasket(ob1: BasketItem, ob2: BasketItem): number {
  let result = 0;
  if (ob1.id > ob2.id) {
    result = 1;
  } else if (ob1.id < ob2.id) {
    result = -1;
  }
  return result;
}

export const adapter: EntityAdapter<BasketItem> = createEntityAdapter<BasketItem>({
  selectId: (basket: BasketItem) => basket.id,
  sortComparer: sortByBasket,
});
export const initialState: BasketState = adapter.getInitialState({
  selectedBasketItemId: null,
});

export function reducer(state = initialState, action: BasketActionsUnion): BasketState {
  switch (action.type) {

    case BasketActionTypes.LoadComplete: {
      return adapter.addMany(action.payload, state);
    } 

    case BasketActionTypes.RemoveAll: {
      return adapter.removeAll(state);
    } 

    case BasketActionTypes.AddBasketItemComplete: {
      const ids: number[] = state.ids as number[];
      const id = action.payload.id as number;
      if (ids.indexOf(id) > -1) {
        return state;
      } else {
        return adapter.addOne(action.payload, state);
      }
    }
    case BasketActionTypes.AddOrderItemsComplete: {
      return adapter.addMany(action.payload, state);
    }
    case BasketActionTypes.RemoveBasketItemComplete: {
      return adapter.removeOne(action.payload, state);
    }
    case BasketActionTypes.Select: {
      return {
        ...state,
        selectedBasketItemId: action.payload.id
      };
    }

    case BasketActionTypes.UpdateBasketItemComplete: {
      return adapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    }
    default: {
      return state;
    }
  }
}

