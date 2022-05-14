import { ChangeDetectionStrategy, Component, ElementRef, HostListener } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../reducers';
import { User } from '../../auth/models/user';
import * as AuthActions from '../../auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `

<app-toolbar>
<button mat-button [matMenuTriggerFor]="menu">Menu<mat-icon>menu</mat-icon></button>
    <mat-menu #menu="matMenu">
      <button mat-menu-item routerLink="/shop">
            <mat-icon>list</mat-icon>
            Browse Products
      </button>
          
      <button mat-menu-item routerLink="/shop/basket">
          <mat-icon>shopping_cart</mat-icon>
          Basket
      </button>
        
      <button mat-menu-item *ngIf="(loggedIn$ | async)" routerLink="/orders" >
          <mat-icon>perm_media</mat-icon>
          Orders
      </button>
      
      <button mat-menu-item *ngIf="(loggedIn$ | async)" routerLink="/account" >
        <mat-icon>all_out</mat-icon>
        Account
      </button>
    
      <button mat-menu-item  *ngIf="!(loggedIn$ | async)" routerLink="/auth"  >
        <mat-icon>account_circle</mat-icon>
        Sign In
      </button>
    
      <button mat-menu-item  *ngIf="loggedIn$ | async" (click)="logout()" >
        <mat-icon>phonelink_off</mat-icon>
        Sign Out
      </button>
  </mat-menu>

      <div style="flex: 1 1 auto;flex-direction: row">
          <span class="login" *ngIf="loggedIn$ | async">
              <span style="color:white">Logged as: </span> <b>{{(user$ | async)?.displayName}}</b>
              <!-- <span style="color:white">LoggedIn as: </span> <b>{{(user$ | async)?.firstName + ' ' + (user$ | async)?.lastName}}</b> -->
          </span>
        </div>
</app-toolbar>

<router-outlet></router-outlet>
  `,
styles: [`
  .login {
    font-size: 10px;
    color: yellow;
    float: right;
    padding-right: 20px;
  }
  
`]
})


export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {
    this.loggedIn$ = this.store.pipe(select(fromRoot.isLoggedIn));
    this.user$ = store.pipe(select(fromRoot.getUser));
  }  
  
  logout() {
      this.store.dispatch(new AuthActions.Logout());
    }
  

}
