import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AccountService } from './services/account.service';
import { AccountEffects } from './effects/account.effects';
// import { reducers } from './reducers';
import { MaterialModule } from '../material';

export const COMPONENTS = [];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class AccountModule {
  static forRoot(): ModuleWithProviders<NgModule> {
    return {
      ngModule: RootAccountModule,
      providers: [AccountService],
    };
  }
}

@NgModule({
  imports: [
    AccountModule,
    // RouterModule.forChild([{ path: 'account', component: LoginPageComponent }]),
    // StoreModule.forFeature('account', reducers),
    EffectsModule.forFeature([AccountEffects]),
  ],
})
export class RootAccountModule {}
