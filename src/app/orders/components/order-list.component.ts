import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { AgGridEvent, GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import 'ag-grid-enterprise';
import { CheckboxRenderer } from '../renderers/eggrid.renderers';

@Component({
  selector: 'app-order-list',
  template: `

   <ag-grid-angular #agGrid
          [gridOptions]="gridOptions" 
          class="ag-theme-alpine-dark"
          [masterDetail]="true"
          [detailCellRendererParams]="detailCellRendererParams"
          [columnDefs]="columnDefs"
          [rowData]="orderList"
          [rowSelection]="'single'"
          [animateRows]="true"
          [sideBar] = "true"
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
      height: 30%
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

export class OrderListComponent implements OnChanges{

  @Input() orderList: Order[];
  @ViewChild(AgGridAngular) agGrid: AgGridAngular;

  gridApi;
  gridColumnApi;
  gridOptions;

  defaultColDef:ColDef = {
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    filter: true
  };

  columnDefs = [
    { headerName: 'Order Date',headerClass:'hear-order-date',  hide: 'false', field: 'orderDate',cellRenderer: 'agGroupCellRenderer',  resizable: false, 
    filter:true,sortable: true, valueFormatter: params => this.dateFormatter(params.data.orderDate)},

    { headerName: 'Order Details',  children: [
        { headerName: 'Status',field: 'status', sortable: true},
        { headerName: 'Amount',field: 'amount',filter:true, sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
        { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer, editable: false }
    ]},
  
    {headerName: 'Delivery Info',   children: [
        { headerName: 'Delivery Date',field: 'deliveryDate', filter:true, sortable: true, 
        valueFormatter: params => this.dateFormatter(params.data.deliveryDate) },
        { headerName: 'Delivery Time',field: 'deliveryTime', sortable:true}
    ]}
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

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
       console.log('changes');
       console.dir(changes['orderList']);
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
    this.agGrid.api.sizeColumnsToFit();
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

}

