import { Action } from '@ngrx/store';

export enum AppAppConfigActionTypes {
  LoadDeliveryTimes = '[AppConfig] Load Delivery Times',
  LoadDeliveryTimesComplete = '[AppConfig] Load Delivery Times Complete ',
  LoadDeliveryTimesError = '[AppConfig] Load Delivery Times Error'
}

export class LoadDeliveryTimes implements Action {
  readonly type = AppAppConfigActionTypes.LoadDeliveryTimes;
  constructor() {}
}

export class LoadDeliveryTimesComplete implements Action {
  readonly type = AppAppConfigActionTypes.LoadDeliveryTimesComplete;
  constructor(public payload: string[]) {}
}

export class LoadDeliveryTimesError implements Action {
  readonly type = AppAppConfigActionTypes.LoadDeliveryTimesError;
  constructor(public payload: any) {}
}

export type AppConfigActionsUnion =
  | LoadDeliveryTimes
  | LoadDeliveryTimesComplete
  | LoadDeliveryTimesError;
