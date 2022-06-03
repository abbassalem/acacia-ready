import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Order } from '../../shop/models/order.model';
import { GridReadyEvent, ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular'
import 'ag-grid-enterprise';
import 'ag-grid-enterprise';
import { ButtonRendererComponent } from '../renderers/button-renderer.component';
import { CheckboxRenderer } from '../renderers/eggrid.renderers';

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
          (gridReady)="onGridReady($event)"
         
          >
          
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

export class OrderListComponent implements OnChanges{

  @Input() orderList: Order[];
  @ViewChild(AgGridAngular) orderGrid: AgGridAngular;

  gridApi;
  gridColumnApi;
  gridOptions;

  defaultColDef:ColDef = {
    enableValue: true,
    sortable: true,
    filter: false,
    lockPinned:true,
    lockVisible: true,
    pinned: 'left'
  };

  columnDefs =  [
   
    { headerName: 'Order Date',
       field: 'orderDate', pinned: 'left',lockPinned:true,lockVisible: true,
        cellRenderer: 'agGroupCellRenderer', valueFormatter: params => this.dateFormatter(params.data.orderDate)},
    {headerName: 'Status',field: 'status'},
    {headerName: 'Amount',field: 'amount',sortable: true, valueFormatter: params =>  params.data.amount.toFixed(2)},
    { headerName: 'Order Payment',field: 'paid', cellRenderer: CheckboxRenderer },
    { headerName: 'Delivery Date',field: 'deliveryDate', 
            valueFormatter: params => this.dateFormatter(params.data.deliveryDate)},
    { headerName: 'Delivery Time',field: 'deliveryTime'},
    { headerName: 'Copy to basket', field: '',  cellRenderer: ButtonRendererComponent,
        // cellStyle: {'color': 'blue', 'background-color': 'darkgrey'},
        cellRendererParams: {
          label: 'Copy to Basket',
          onClick: function(params: any) {
             alert('data: ' + params.rowData.deliveryDate);
             console.table(params.rowData.items);
          }
    }
  }
  ];
  // cellStyle: {'color': 'maroon', 'background-color': 'lightgrey'}, 
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

  ngOnChanges(changes: SimpleChanges): void {
      //  console.log('changes');
      //  console.dir(changes['orderList']);
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

