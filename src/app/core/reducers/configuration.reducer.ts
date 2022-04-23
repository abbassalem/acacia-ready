import {
  ConfigActionTypes,
  ConfigActionsUnion,
} from '../actions/configuration.actions';

export interface State {
  deliveryTimes: string[];
}

const initialState: State = {
  deliveryTimes: []
}; 

export function reducer(
  state: State = initialState, action: ConfigActionsUnion): State {
  switch (action.type) {
    case ConfigActionTypes.LoadDeliveryTimesComplete:
      return {
        deliveryTimes: action.payload
      };
    case ConfigActionTypes.LoadDeliveryTimesError:
        return {
          deliveryTimes: []
        };
    default:
      return state;
  }
}

export const getDeliveryTimes = (state: State) => state.deliveryTimes;
