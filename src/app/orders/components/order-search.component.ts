import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { OrderSearchCriteria, OrderStatus } from 'src/app/shop/models/order.model';

@Component({
  selector: 'app-order-search',
  template: `
  <form [formGroup]="searchGroup">
  <mat-tab-group (selectedTabChange)="tabChange($event)"  >
  <mat-tab> 
      <ng-template matTabLabel *ngIf="activeTab === 0">
          <span [matBadge]="orderCount" matBadgeOverlap="false">Open Orders</span>
      </ng-template>
      <ng-template matTabLabel *ngIf="activeTab !== 0">
          <span matBadgeOverlap="false">Open Orders</span>
      </ng-template>
      <mat-toolbar>
        <mat-toolbar-row>
        </mat-toolbar-row>
       </mat-toolbar> 
  </mat-tab>
 
  <mat-tab label="Search Orders"> 
      <mat-toolbar>
      <mat-toolbar-row>            
        <mat-form-field>
              <mat-select formControlName="orderStatus">
                  <mat-option *ngFor= "let status of statusList" [value]="status.value" 
                    [selected]="status.isSelected">{{status.label}}
                  </mat-option>
              </mat-select>
        </mat-form-field>
        &nbsp;&nbsp;
        <button style="align-content: flex-start;" mat-flat-button color="accent" [disabled]="!searchGroup.valid" (click) = "executeSearch()">
            <mat-icon>search</mat-icon>Search
        </button>
      </mat-toolbar-row>
    </mat-toolbar> 
  </mat-tab>
  </mat-tab-group>
  </form>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      color: #FF0000;
      padding: 5px 0;
    }

    .mat-form-field {
      min-width: 300px;
      font-size: 12px;
    }

    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      padding-left: 60px;
    }

    .mat-spinner.show {
      opacity: 1.0;
    }
  `,
  ],
})
export class OrderSearchComponent implements OnInit {
  
  @Input() query = '';
  activeTab: number = 0;
  @Input() orderCount?: number;
  @Output() searchCriteriaChange = new EventEmitter<OrderSearchCriteria>();

  searchGroup: FormGroup;
  statusList: Status[] = [];

  constructor() {
  }

  ngOnInit() {
    this.initilizeStatusList();
    this.searchGroup = new FormGroup(
      {
        startDate: new FormControl(new Date(0), [Validators.required]),
        endDate: new FormControl(new Date(), [Validators.required]),
        orderStatus: new FormControl('ALL')
      }
    );   
    this.openOrders();
  }
   
  initilizeStatusList(){
    this.statusList.push({value: 'ALL', label: 'All', isSelected: false});
    this.statusList.push({value: 'OPEN', label: 'Open', isSelected: true});
    this.statusList.push({value: 'CLOSED', label: 'Closed', isSelected: false});
    this.statusList.push({value: 'DELIVERED', label: 'Delivered', isSelected: false});
    this.statusList.push({value: 'CANCELLED', label: 'Cancelled', isSelected: false});
  }

  openOrders(){
    this.executeSearch(true);
  }

  tabChange(event: MatTabChangeEvent) {
    this.activeTab = event.index;
    if(event.index === 0){
      this.executeSearch(true);
    } else {
      this.executeSearch();
    }
} 

// executeSearch() {
   
//   let orderSearchCriteria: OrderSearchCriteria = {
//     start: this.searchGroup.get('startDate').value.getTime(),
//     end: this.searchGroup.get('endDate').value.getTime(),
//     status: this.searchGroup.get('orderStatus').value,
//   };
//   this.searchCriteriaChange.emit(orderSearchCriteria);
// }
// }

executeSearch(open?: boolean) {

  let orderSearchCriteria: OrderSearchCriteria ;
  if(open){
    orderSearchCriteria = {
      status: OrderStatus.OPEN
    }
  } else {
    orderSearchCriteria = {
      start: this.searchGroup.get('startDate').value.getTime(),
      end: this.searchGroup.get('endDate').value.getTime(),
      status: this.searchGroup.get('orderStatus').value
    }
  };
  this.searchCriteriaChange.emit(orderSearchCriteria);
}

}

export interface Status {
  value: string;
  label: string;
  isSelected: boolean;
} 

