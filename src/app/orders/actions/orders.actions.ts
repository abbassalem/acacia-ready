import { Action } from '@ngrx/store';
import { DurationWithStatus, Order } from '../../shop/models/order.model';

export enum OrderActionTypes {
  Reset = '[Order] Reset',
  Load = '[Order] Load',
  LoadComplete = '[Order] Load Complete',
  LoadError = '[Order] Load Error',
  Select = '[Order] Select Order Item',
  Copy = '[Order] Copy',
  CopyComplete = '[Order] Copy Complete',
  CopyError = '[Order] Copy Error',
  SaveOrder = '[Order] Save Order',
  SaveOrderComplete = '[Order] Save Order Complete',
  SaveOrderError = '[Order] Save Order Error'
}

export class Reset implements Action {
  readonly type = OrderActionTypes.Reset;
  constructor() { }
}

export class SaveOrder implements Action {
  readonly type = OrderActionTypes.SaveOrder;
  constructor(public payload: Order) { }
}

export class SaveOrderComplete implements Action {
  readonly type = OrderActionTypes.SaveOrderComplete;
  constructor(public payload: Order) { }
}

export class SaveOrderError implements Action {
  readonly type = OrderActionTypes.SaveOrderError;
  constructor(public payload: string) { }
}

export class Load implements Action {
  readonly type = OrderActionTypes.Load
  constructor(public payload: {userId: string, durationWithStatus: DurationWithStatus}) { }
}

export class LoadComplete implements Action {
  readonly type = OrderActionTypes.LoadComplete;
  constructor(public payload: any[]) { }
}

export class LoadError implements Action {
  readonly type = OrderActionTypes.LoadError;
  constructor(public payload: any) { }
}

export class Select implements Action {
  readonly type = OrderActionTypes.Select;
  constructor(public payload: string) { }
}

export class Copy implements Action {
  readonly type = OrderActionTypes.Copy;
  constructor(public payload: Order) { }
}

export class CopyComplete implements Action {
  readonly type = OrderActionTypes.CopyComplete;
  constructor(public payload: Order) { }
}

export class CopyError implements Action {
  readonly type = OrderActionTypes.CopyError;
  constructor(public payload: any) { }
}

export type OrderActionsUnion =
  | Reset
  | Load
  | LoadComplete
  | LoadError
  | Select
  | Copy
  | CopyComplete
  | CopyError
  | SaveOrder
  | SaveOrderComplete
  | SaveOrderError
