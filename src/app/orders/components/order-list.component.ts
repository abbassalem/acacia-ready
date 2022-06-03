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

  // toolPanels: [
  //   {
  //     id: 'id',
  //     labelDefault: 'labelDefault',
  //     labelKey: 'labelKey',
  //     iconKey: 'iconKey',
  //     toolPanel: 'agColumnsToolPanel',
  //     toolPanelParams: {
  //       suppressPivotMode: true,
  //       suppressValues: true,
  //     },
  //   },
  // ]
  
  columnDefs =  [
   
    { headerName: 'Order Date',
       field: 'orderDate', pinned: 'left',lockPinned:true,lockVisible: true,
        cellStyle: {'color': 'yellow', 'font-weight': 'bold'},
        cellRenderer: 'agGroupCellRenderer', valueFormatter: params => this.dateFormatter(params.data.orderDate)},
    {headerName: 'Status',field: 'status'},
    {headerName: 'Amount',field: 'amount',sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
    { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer },
    { headerName: 'Delivery Date',field: 'deliveryDate', 
            valueFormatter: params => this.dateFormatter(params.data.deliveryDate)},
    { headerName: 'Delivery Time',field: 'deliveryTime'},
    { headerName: 'Add to basket', field: '',  cellRenderer: ButtonRendererComponent,
        cellRendererParams: {
          label: 'Add to Basket',
          onClick: params => {
            this.addToBasket(params.rowData.items);
          }
    }
  }
  ];
  
  detailCellRendererParams = {
    detailGridOptions: {
        columnDefs: [
            { headerName: 'ID', field: 'id' },
            { headerName: 'Quantity',  field: 'quantity'},
            { headerName: 'Product Name',field: 'product.name'}
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

  dateFormatter(date): string {
    let str = new Date(date).getDate().toString() + '/' + 
    new Date(date).getMonth().toString() +  '/' + new Date(date).getFullYear().toString();
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

