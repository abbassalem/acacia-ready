import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigService } from '../services/config.service';
import * as fromConfigActions from './../actions/configuration.actions';

@Injectable()
export class ConfigEffects {

  constructor(private actions$: Actions, private configService: ConfigService) {
  }

  @Effect({ dispatch: false })
  loadDeliveryTimesSuccess$ = this.actions$.pipe(
    ofType<fromConfigActions.LoadDeliveryTimesComplete>(fromConfigActions.ConfigActionTypes.LoadDeliveryTimesComplete)
  );


@Effect({dispatch: true})
loadDeliveryTimes$ = this.actions$.pipe(
  ofType<fromConfigActions.LoadDeliveryTimes>(fromConfigActions.ConfigActionTypes.LoadDeliveryTimes),
  switchMap( action => 
        this.configService.getDeliveryTimes()
      .then( (deliveryTimes: Array<string>) => 
        new fromConfigActions.LoadDeliveryTimesComplete(deliveryTimes)
      )
      .catch(err => of(new fromConfigActions.LoadDeliveryTimesError(err)))
    )
  );

  }

// @Effect()
// loadDeliveryTimes$: Observable<Action> = this.actions$.pipe(
//   ofType<fromConfigActions.LoadDeliveryTimes>(fromConfigActions.ConfigActionTypes.LoadDeliveryTimes),
//   switchMap( () => {
//     return this.configService.getDeliveryTimes().pipe(
//       map( (deliveryTimes: Array<string>) => {
//         return new fromConfigActions.LoadDeliveryTimesComplete(deliveryTimes);
//       }),
//       catchError(err => of(new fromConfigActions.LoadDeliveryTimesError(err)))
//     );
//   })
// );