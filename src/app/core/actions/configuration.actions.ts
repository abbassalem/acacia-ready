import { Action } from '@ngrx/store';

export enum ConfigActionTypes {
  LoadDeliveryTimes = '[Config] Load Delivery Times',
  LoadDeliveryTimesComplete = '[Config] Load Delivery Times Complete ',
  LoadDeliveryTimesError = '[Config] Load Delivery Times Error'
}

export class LoadDeliveryTimes implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimes;
  constructor() {}
}

export class LoadDeliveryTimesComplete implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimesComplete;
  constructor(public payload: string[]) {}
}

export class LoadDeliveryTimesError implements Action {
  readonly type = ConfigActionTypes.LoadDeliveryTimesError;
  constructor(public payload: any) {}
}

export type ConfigActionsUnion =
  | LoadDeliveryTimes
  | LoadDeliveryTimesComplete
  | LoadDeliveryTimesError;
