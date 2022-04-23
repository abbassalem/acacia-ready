import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export enum ProductActionTypes {
  Search = '[Product] Search',
  SearchComplete = '[Product] Search Complete',
  SearchError = '[Product] Search Error',
  Load = '[Product] Load',
  LoadComplete = '[Product] Load Complete',
  LoadError = '[Product] Load Error',
  Select = '[Product] Select',
  SelectComplete = '[Product] Select Complete',
  SelectError = '[Product] Select Error'
}

export class Search implements Action {
  readonly type = ProductActionTypes.Search;
  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = ProductActionTypes.SearchComplete;
  constructor(public payload: Product[]) {}
}

export class SearchError implements Action {
  readonly type = ProductActionTypes.SearchError;
  constructor(public payload: string) {}
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
  constructor() {}
}

export class LoadComplete implements Action {
  readonly type = ProductActionTypes.LoadComplete;
  constructor(public payload: Product[]) {}
}

export class LoadError implements Action {
  readonly type = ProductActionTypes.LoadError;
  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = ProductActionTypes.Select;
  constructor(public payload: number) {}
}

export class SelectComplete implements Action {
  readonly type = ProductActionTypes.SelectComplete;
  constructor(public payload: number) {}
}

export class SelectError implements Action {
  readonly type = ProductActionTypes.SelectError;
  constructor(public payload: number) {}
}

export type ProductActionsUnion =
  | Load
  | LoadComplete
  | LoadError
  | Select
  | SelectComplete
  | SelectError
  | SearchComplete
  | SearchError
  | Search;
