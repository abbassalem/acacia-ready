import { ChangeDetectionStrategy, Component, ElementRef, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AuthActions from '../../auth/actions/auth.actions';
import * as fromRoot from '../../reducers';
import * as LayoutActions from '../actions/layout.actions';
import { User } from '../../auth/models/user';
  
@Component({
  selector: 'app-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  
    <app-layout>
        <app-sidenav [open]="showSidenav$ | async">

        <app-nav-item (navigate)="closeSidenav()" routerLink="/shop" icon="view_list"
        hint="Find products">
          Browse Products
        </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" routerLink="/shop/basket" icon="shopping_cart"
            hint="View basket">
                Basket
        </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" *ngIf="(loggedIn$ | async)" routerLink="/orders" icon="storage"
        hint="View Orders">
            Orders
      </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()" *ngIf="(loggedIn$ | async)" routerLink="/account" icon="account_circle"
            hint="View account">
                Account
        </app-nav-item>

        <app-nav-item (navigate)="closeSidenav()"  *ngIf="!(loggedIn$ | async)" routerLink="/auth" icon="perm_identity" >
          Sign In
        </app-nav-item>

        <app-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async" oncli="logout()" icon="account_circle">
          Sign Out
        </app-nav-item>

        </app-sidenav>

      <app-toolbar (openMenu)="openSidenav()">

        <div style="flex: 1 1 auto;flex-direction: row">
          <span style="align-self: flex-start">Acacia</span>
          <span class="login" *ngIf="loggedIn$ | async">
              <span style="color:white">LoggedIn as: </span> <b>{{(user$ | async)?.displayName}}</b>
              <!-- <span style="color:white">LoggedIn as: </span> <b>{{(user$ | async)?.firstName + ' ' + (user$ | async)?.lastName}}</b> -->
          </span>
        </div>
      </app-toolbar>

      <router-outlet></router-outlet>
    </app-layout>
  `,
  styles: [`.login {
    font-size: 10px;
    color: yellow;
    float: right;
  }`]
})


export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromRoot.isLoggedIn));
    this.user$ = store.pipe(select(fromRoot.getUser));
  }

  closeSidenav() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());
  }

  logout() {
    this.closeSidenav();
    this.store.dispatch(new AuthActions.Logout());
  }

}
