import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild, ɵɵsetComponentScope } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { ButtonRendererComponent } from '../renderers/button-renderer.component';
import { CheckboxRenderer } from '../renderers/eggrid.renderers';
import { BasketItem } from 'src/app/shop/models/BasketItem.model';

@Component({
  selector: 'app-order-list',
  template: `
 <ag-grid-angular #agGrid *ngIf="orderList && orderList.length > 0"
          [gridOptions]="gridOptions" 
          [masterDetail]="true"
          [pagination]= "true"
          [paginationPageSize]= '10'
          [columnDefs]= "columnDefs"
          [defaultColDef]="defaultColDef"
          class="ag-theme-alpine-dark"
          [detailCellRendererParams]="detailCellRendererParams"
          [rowData]="orderList"
          [getRowNodeId]="getRowNodeId"
          [animateRows]="true"
          [pivotColumnGroupTotals]=""
          (gridReady)="onGridReady($event)">
          
   </ag-grid-angular>
`,
  styles: [
    `
    .header-order-date{
      color: blue;
      font-weight: bold;
      background-color: white;
    }

    ag-grid-angular {
      width: 100%;
      height: 530px;
    }
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
    .toolbar-flex{
      flex: 1 0.5 auto;
      float:left
    }
  `,
  ]
})

export class OrderListComponent {

  @Input() orderList: Order[];
  @ViewChild(AgGridAngular) orderGrid: AgGridAngular;
  @Output() addToBasketEvent: EventEmitter<BasketItem[]> = new EventEmitter();
  gridApi;
  gridColumnApi;
  gridOptions;

  defaultColDef:ColDef = {
    sortable: true,
    filter: true,
    editable: false
  };
  
  columnDefs =  [
   
    { headerName: 'Order Date - Expand for Items',
       field: 'orderDate', pinned: 'left',lockPinned:true,lockVisible: true,
        cellStyle: {'color': 'yellow', 'font-weight': 'bold', 'min-width': '80px'},
        cellRenderer: 'agGroupCellRenderer', valueFormatter: params => this.dateFormatter(params.data.orderDate, true)},
    {headerName: 'Status',field: 'status'},
    {headerName: 'Amount  (£)',field: 'amount',sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
    { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer },
    { headerName: 'Delivery Date',field: 'deliveryDate', 
            valueFormatter: params => this.dateFormatter(params.data.deliveryDate, false)},
    { headerName: 'Delivery Time',field: 'deliveryTime'},
    { headerName: '', field: '',  cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          label: 'Add items to Basket',
          onClick: params => {
            this.addToBasket(params.rowData.items);
          }
    }
  }
  ];
  
  detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
          { headerName: 'Name',field: 'product.name'},
          { headerName: 'Description', field: 'product.description' },
          { headerName: 'Reference', field: 'product.reference' },
          { headerName: 'Quantity',  field: 'quantity'}
        ],

        onFirstDataRendered: params => {
          params.api.sizeColumnsToFit();
        }
    },
    getDetailRowData: (params) => {
        params.successCallback(params.data.items);
    }, 
  };

  constructor() {
  }
  
  addToBasket(items: Array<BasketItem>) {
    this.addToBasketEvent.emit(items);
  }

  dateFormatter(date: Date, withTime: boolean ): string {
    
    let str:string;
    if(withTime){
      str = new Date(date).getDate().toString() + '/' + 
      new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString() + '-' + new Date(date).getHours().toString().padStart(2,'0') + ':' + new Date(date).getMinutes().toString().padStart(2,'0');
    } else {
      str = new Date(date).getDate().toString() + '/' + 
      new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString();
    }
    return str;
  }


  getRowNodeId(params)  {
    return params.id;
  }

  onGridReady(params: GridReadyEvent) {
    this.orderGrid.api.sizeColumnsToFit();
  }

  clearSelection(): void {
    this.orderGrid.api.deselectAll();
  }

}

