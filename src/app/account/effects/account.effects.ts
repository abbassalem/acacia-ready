import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { AccountService } from '../services/account.service';

@Injectable()
export class AccountEffects {
  // @Effect()
  // login$ = this.actions$.pipe(
  //   ofType<Login>(AuthActionTypes.Login),
  //   map(action => action.payload),
  //   exhaustMap((auth: Authenticate) =>
  //     this.authService
  //       .login(auth)
  //       .pipe(
  //         map(user => new LoginComplete({ user })),
  //         catchError(error => of(new LoginError(error)))
  //       )
  //   )
  // );

  // constructor(
  //   private actions$: Actions,
  //   private accountService: AccountService
  // ) {}
}
