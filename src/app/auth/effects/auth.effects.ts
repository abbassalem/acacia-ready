import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as fromAuthActions from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { RemoveAll } from '../../shop/actions/basket.actions';
import { BasketState } from '../../shop/reducers/basket.reducer';
import { Reset } from '../../orders/actions/orders.actions';
import { OrderState } from '../../orders/reducers/orders.reducer';
import { Store } from '@ngrx/store';
import { AuthProvider, FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private orderStore: Store<OrderState>,
    private basketStore: Store<BasketState>,
  ) {}


  pickAuthProvider(providerName: string): AuthProvider {
      let provider:AuthProvider ;
      switch(providerName) {
        case 'google':{
          provider = new GoogleAuthProvider();
          break;
        }
        case 'facebook':{
          provider = new FacebookAuthProvider();
          break;
        }
      }
      return provider;
  }

  @Effect({dispatch: true})
  signup$ = this.actions$.pipe(
      ofType<fromAuthActions.Signup>(fromAuthActions.AuthActionTypes.Signup),
        switchMap( action => this.authService.SignUp(action.payload.email, action.payload.password, action.payload.extraData)
          .then(
            () => {
                return new fromAuthActions.SignupComplete();
              }
          )
          .catch(
              error => of(new fromAuthActions.SignupError(error))
          )
        )
  );

  @Effect({ dispatch: false })
  SignupSuccess$ = this.actions$.pipe(
    ofType<fromAuthActions.SignupComplete>(fromAuthActions.AuthActionTypes.SignupComplete),
    tap(() => {this.router.navigate(['/shop'])})
  );

  @Effect({dispatch: true})
  login$ = this.actions$.pipe(
      ofType<fromAuthActions.Login>(fromAuthActions.AuthActionTypes.Login),
        switchMap( action => this.authService.SignIn(action.payload.email, action.payload.password)
          .then(
            user => {
                return new fromAuthActions.LoginComplete(user);
              }
          )
          .catch(
              error => of(new fromAuthActions.LoginError(error))
          )
        )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.LoginComplete),
    tap(() => {
      this.location.back();
      // this.router.navigate(['/shop/basket'])
    })
  );

  @Effect({dispatch: true})
  loginWithProvider$ = this.actions$.pipe(
      ofType<fromAuthActions.LoginWithProvider>(fromAuthActions.AuthActionTypes.LoginWithProvider),
      switchMap( action => 
            this.authService.authProvider(this.pickAuthProvider(action.payload))
          .then(
            user => {
                return new fromAuthActions.LoginWithProviderComplete(user);
              }
          )
          .catch(
              error => of(new fromAuthActions.LoginError(error))
          )
        )
  );

  @Effect({ dispatch: false })
  loginWithProviderSuccess$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.LoginWithProviderComplete),
    tap(() => this.router.navigate(['/shop/basket']))
  );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$.pipe(
    ofType(fromAuthActions.AuthActionTypes.LoginRedirect, fromAuthActions.AuthActionTypes.Logout),
    tap(authed => {
      this.basketStore.dispatch(new RemoveAll());
      this.orderStore.dispatch(new Reset());
      this.router.navigate(['/auth']);
    })
  );
}
