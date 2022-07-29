import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import * as fromAuth from '../reducers/auth.reducer';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private store: Store<fromAuth.State>) {}

  canActivate(): boolean {
    // return this.store.pipe(
      if(this.authService.userState){  
        return true;
      } else {
        return false;
      }
  
    //   select(fromAuth.getLoggedIn),
    //   map(authed => {
    //     if (!authed) {
    //       this.store.dispatch(new AuthActions.LoginRedirect());
    //       return false;
    //     }
    //     return true;
    //   }),
    //   take(1)
    // );
  }
}
