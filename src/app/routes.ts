import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop',
    pathMatch: 'full'
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then ( module => module.ShopModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( module => module.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( module => module.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule)
  },
  {
    path: '**',
    component: NotFoundPageComponent
  },
];
