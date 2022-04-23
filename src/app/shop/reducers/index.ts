import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as fromBasket from './basket.reducer';
import * as fromCategories from './categories.reducer';

export interface ShopState {
  basket: fromBasket.BasketState;
  categories: fromCategories.CategoryState;
}

export interface State extends fromRoot.State {
  shop: ShopState;
}

export const reducers: ActionReducerMap<ShopState> = {
  basket: fromBasket.reducer,
  categories: fromCategories.reducer,
};

/* SELECTORS */

export const getShopState = createFeatureSelector<ShopState>('shop');
export const getBasketState = createSelector(getShopState, (state: ShopState) => state.basket);
export const getCategoryState = createSelector(getShopState, (state: ShopState) => state.categories);

/* categories and products*/
export const getSelectedCategoryId = createSelector(getCategoryState,  (state) => state.selectedCategoryId);
export const getSelectedProductId = createSelector(getCategoryState,  (state) => state.selectedProductId);
export const isLoaded = createSelector(getCategoryState,  (state) => state.isLoaded);

export const {
  selectIds: getCategoryIds,
  selectEntities: getCategoryEntities,
  selectAll: getAllCategories,
  selectTotal: categoryCount
} = fromCategories.adapter.getSelectors(getCategoryState);

// export const {
//   selectEntities: getCategoryEntities,
//   selectAll: getAllCategories,
//   selectTotal: categoryCount
// } = fromOrder.adapter.getSelectors(getOrderState);

export const getFirstCateogry = createSelector(
  getBasketState,
  (state) => state.ids[0]
);

export const getProductsForSelectedCategory = createSelector(
  getSelectedCategoryId,
  getCategoryEntities,
  (id, entities) => {
        return entities[id].products;
  }
);

export const getSelectedProduct = createSelector(
  getSelectedProductId,
  getSelectedCategoryId,
  getCategoryEntities,
  (prodId, catId, cats) => {
        return cats[catId].products.filter( product => product.id === prodId)[0];
  }
);

/* basket */
export const getSelectedBasketItemId = createSelector(getBasketState,  (state) => state.selectedBasketItemId);

export const {
  selectIds: getBasketItemIds,
  selectEntities: getBasketItemEntities,
  selectAll: getAllBasketItems,
  selectTotal: basketItemCount
} = fromBasket.adapter.getSelectors (getBasketState);

export const isSelectedProductInBasket = createSelector(
  getSelectedProductId,
  getAllBasketItems,
  (prodId, items) => {
     const found = items.findIndex( item =>
       item.id === prodId);
     if (found > -1) {
       return true;
     } else {
        return false;
     }
    }
);
