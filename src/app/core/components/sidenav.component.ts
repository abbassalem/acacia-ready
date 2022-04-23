import { Component, ElementRef, HostListener, Input } from '@angular/core';
import {  Store } from '@ngrx/store';
import * as fromLayout from '../reducers/layout.reducer';
import * as LayoutActions from '../actions/layout.actions';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-sidenav [opened]="open">
    <!-- <mat-sidenav (clickOutside)="toggle(event)" [opened]="open"> -->
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [
    `
    mat-sidenav {
      width: 300px;
    }
  `,
  ],
})

export class SidenavComponent {
  
  @Input() open = false;

  // clickedInside: Boolean;

  // @HostListener('window:click', ['$event']) 
  // toggle(event){
  //   console.log('event');
  //   console.dir(event);
  //   console.log('event.target');
  //   console.dir(event.target);

  //   console.log('native');
  //   console.dir(this.el.nativeElement);
    
  //   console.log('contains target');
  //   console.log(this.el.nativeElement.contains(event.target));

  //   console.log('clickedIside: ' + this.clickedInside);
  //   if(!this.el.nativeElement.contains(event.target) ) {
  //     console.log('inside if');
  //     this.store.dispatch(new LayoutActions.CloseSidenav());
  //   } else {
  //     console.log('outside if ');
  //   }
  // }

  constructor(private store: Store<fromLayout.State>){
  }
 
  
  // toggle(event) {
  //   console.log('toggle => event ' + event);
  //   this.store.dispatch(new LayoutActions.CloseSidenav());
  //   // this.store.pipe(select(fromLayout.getShowSidenav)).subscribe (value => this.clickedInside = value);
  // }
}
