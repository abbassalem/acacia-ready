import * as fromRouter from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import * as fromConfig from '../core/reducers/configuration.reducer';
import * as fromAuth from '../auth/reducers/auth.reducer';
import { RouterStateUrl } from '../shared/utils';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

export interface State {
  config: fromConfig.State;
  auth: fromAuth.State;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */
export const reducers: ActionReducerMap<State> = {
  config: fromConfig.reducer,
  router: fromRouter.routerReducer,
  auth: fromAuth.reducer
};

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return function(state: State, action: any): State {
    // console.log('state', state);
    // console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = [logger];
//  !environment.production  ? [logger, storeFreeze]: [];

export const getConfigState = createFeatureSelector<fromConfig.State>('config');
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getDeliveryTimes = createSelector(
  getConfigState,
  fromConfig.getDeliveryTimes
);

export const isLoggedIn = createSelector(
  getAuthState,
  fromAuth.getLoggedIn
);

export const getUser = createSelector(
  getAuthState,
  fromAuth.getUser
);

export const getPending = createSelector(
  getAuthState,
  fromAuth.getPending
);

export const getErrors = createSelector(
  getAuthState,
  fromAuth.getErrors
);