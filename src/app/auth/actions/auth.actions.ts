import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginComplete = '[Auth] Login Success',
  LoginError = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect',
  LoginWithProvider = '[Auth] Login with Provider',
  LoginWithProviderComplete = '[Auth] Login with Provider Success',
  LoginWithProviderError = '[Auth] Login with Provider Failure',
  Signup = '[Auth] Sign Up',
  SignupComplete = '[Auth] Sign Up Success',
  SignupError = '[Auth] Sign Up Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: Authenticate) {}
}
export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LoginComplete;
  constructor(public payload: User) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LoginError;
  constructor(public payload: string) {}
}

export class LoginWithProvider implements Action {
  readonly type = AuthActionTypes.LoginWithProvider;
  constructor(public payload: string) {}
}

export class LoginWithProviderComplete implements Action {
  readonly type = AuthActionTypes.LoginWithProviderComplete;
  constructor(public payload: User) {}
}

export class LoginWithProviderError implements Action {
  readonly type = AuthActionTypes.LoginWithProviderError;
  constructor(public payload: string) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.Signup;
  constructor(public payload: {email: String, password: String, extraData:any}) {}
}

export class SignupComplete implements Action {
  readonly type = AuthActionTypes.SignupComplete;
  constructor() {}
}

export class SignupError implements Action {
  readonly type = AuthActionTypes.SignupError;
  constructor(public payload: string) {}
}

export class LoginRedirect implements Action {
  readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginComplete
  | LoginError
  | LoginRedirect
  | Logout
  | LoginWithProvider
  | LoginWithProviderComplete
  | LoginWithProviderError
  | Signup
  | SignupComplete
  | SignupError
  ;
