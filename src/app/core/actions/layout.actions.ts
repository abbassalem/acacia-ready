import { Action } from '@ngrx/store';


export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.OpenSidenav;
  constructor() {}
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.CloseSidenav;
  constructor() {}
}

export type LayoutActionsUnion = OpenSidenav | CloseSidenav;

