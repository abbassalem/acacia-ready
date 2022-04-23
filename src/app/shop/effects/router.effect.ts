import { Injectable } from '@angular/core';
import { Database } from '@ngrx/db';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';

@Injectable()
export class RouterEffects {

// @Effect() routeChange$ = this.actions$
//     .ofType(ROUTER_NAVIGATION)
//     .pipe(
//         filter((action: RouterNavigationAction) =>
//             action.payload.routerState.url.indexOf('/products/categories/') > -1),
//     switchMap()
//     );
//     constructor(private actions$: Actions) {
//     }
}
