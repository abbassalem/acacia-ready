import {
  AppAppConfigActionTypes,
  AppConfigActionsUnion,
} from '../actions/app-config.actions';

export interface State {
  deliveryTimes: string[];
}

const initialState: State = {
  deliveryTimes: []
};

export function reducer(
  state: State = initialState, action: AppConfigActionsUnion): State {
  switch (action.type) {
    case AppAppConfigActionTypes.LoadDeliveryTimesComplete:
      return {
        deliveryTimes: action.payload
      };
      case AppAppConfigActionTypes.LoadDeliveryTimesError:
        return {
          deliveryTimes: []
        };
    default:
      return state;
  }
}

export const getDeliveryTimes = (state: State) => state.deliveryTimes;
