import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Authenticate } from '../models/user';
import * as fromAuth from '../reducers/auth.reducer';
import * as AuthActions from '../actions/auth.actions';

@Component({
  selector: 'app-login-page',
  template: `
    <app-sign-in (emailSubmission)="doLogin($event)" (providerSubmission)="authLogin($event)">
    </app-sign-in>    
  `,
  styles: [],
})

// [pending]="pending$ | async"
// [errors]="errors$ | async">
export class LoginPageComponent implements OnInit{

  // pending$ = this.store.pipe(select(fromAuth.getPending));
  // errors$ = this.store.pipe(select(fromAuth.getErrors));
  constructor(private store: Store<fromAuth.State>) {}

  ngOnInit(): void {
    
  }

  doLogin(userAuth:Authenticate) {
    this.store.dispatch(new AuthActions.Login(userAuth));
  }

  authLogin(providerName: string) {
    this.store.dispatch(new AuthActions.LoginWithProvider(providerName));
  }
 
}
