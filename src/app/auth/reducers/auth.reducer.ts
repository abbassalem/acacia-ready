import { AuthActionsUnion, AuthActionTypes } from './../actions/auth.actions';
import { User } from '../models/user';
import { createFeatureSelector } from '@ngrx/store';

export interface State {
  loggedIn: boolean;
  user: User ;
  pending: boolean;
  errors: any;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
  pending: false,
  errors: ''
};

export const selectAuthState = createFeatureSelector<State>('auth');

export function reducer(state = initialState, action: AuthActionsUnion): State {
  
  switch (action.type) {

    case AuthActionTypes.Signup: {
      return {
        ...state,
        pending: true
      };
    }
    case AuthActionTypes.SignupComplete: {
      return {
        ...state,
        pending: false,
        loggedIn: false
        // user: action.payload,
      };
    }

    case AuthActionTypes.SignupError: {
      return {
        ...state,
        pending: false,
        loggedIn: false,
      };
    }

    case AuthActionTypes.Login: {
      return {
        ...state,
        pending: true
      };
    }
    case AuthActionTypes.LoginComplete: {
      return {
        ...state,
        loggedIn: true,
        pending: false,
        user: action.payload,
      };
    }

    case AuthActionTypes.LoginError: {
      return {
        ...state,
        pending: false
      };
    }

    case AuthActionTypes.LoginWithProvider: {
      return {
        ...state,
        pending: true
      };
    }
    case AuthActionTypes.LoginWithProviderComplete: {
      return {
        ...state,
        loggedIn: true,
        pending: false,
        user: action.payload,
      };
    }

    case AuthActionTypes.LoginWithProviderError: {
      return {
        ...state,
        pending: false
      };
    }


    case AuthActionTypes.Logout: {
      return initialState;
    }

    default: {
      return state;
    }
  }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getUser = (state: State) => state.user;
export const getPending = (state: State) => state.pending;
export const getErrors = (state: State) => state.errors;


