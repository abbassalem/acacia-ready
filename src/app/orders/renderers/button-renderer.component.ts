import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams, IAfterGuiAttachedParams, } from 'ag-grid-community';

@Component({
  selector: 'app-button-renderer',
  template: `
    <button type="button" (click)="onClick($event)">{{label}}</button>
    `
})

export class ButtonRendererComponent implements ICellRendererAngularComp, OnDestroy{

  params;
  label: string;

  agInit(params): void {
    this.params = params;
    this.label = this.params.label || null;
  }

  refresh(params?: any): boolean {
    return true;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
        columnDefs: this.params.columnDefs,
        label: this.params.label

      }
      this.params.onClick(params);

    }
  }

    ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

}


// @Component({
//   selector: 'btn-cell-renderer',
//   template: `
//     <button (click)="btnClickedHandler($event)">Click me!</button>
//   `,
// })


// export class BtnCellRenderer implements ICellRendererAngularComp, OnDestroy {
//   private params: any;

//   agInit(params: any): void {
//     this.params = params;
//   }

//   btnClickedHandler() {
//     this.params.clicked(this.params.value);
//   }

//   ngOnDestroy() {
//     // no need to remove the button click handler 
//     // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
//   }
// }