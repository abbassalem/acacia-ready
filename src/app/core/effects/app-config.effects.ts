import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of,pipe } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppConfigService } from '../services/app-config.service';
import * as fromConfigActions from './../actions/app-config.actions';


@Injectable()
export class AppConfigEffects {

  constructor(private actions$: Actions, private configService: AppConfigService) {
  }

@Effect()
loadDeliveryTimes$: Observable<Action> = this.actions$.pipe(
  ofType<fromConfigActions.LoadDeliveryTimes>(fromConfigActions.AppAppConfigActionTypes.LoadDeliveryTimes),
  switchMap( () => {
    return this.configService.getConfig().pipe(
      map( (config: any) => {
        const times = config.deliveryTimes;
        return new fromConfigActions.LoadDeliveryTimesComplete(times)
      }),
      catchError(err => of(new fromConfigActions.LoadDeliveryTimesError(err)))
    );
  })
);

}
