import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderSearchCriteria } from 'src/app/shop/models/order.model';

@Component({
  selector: 'app-order-search',
  template: `
  <form [formGroup]="searchGroup">
      <mat-toolbar>
        <mat-toolbar-row>
            <h6 style="float: right"><small>Search order</small></h6>
      </mat-toolbar-row>
      
      <mat-toolbar-row>    
      <mat-form-field style="max-width: fit-content;" >
            <input  matInput [matDatepicker]="picker1" placeholder="Choose start date" formControlName="startDate">
            <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
            <mat-datepicker #picker1></mat-datepicker>
      </mat-form-field>
      &nbsp;&nbsp;
      <mat-form-field style="max-width: fit-content;">
            <input matInput [matDatepicker]="picker2" placeholder="Choose end date" formControlName="endDate">
            <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
            <mat-datepicker #picker2></mat-datepicker>
          </mat-form-field>
        &nbsp;&nbsp;
            
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
  @Input() searching = false;
  @Input() error = '';
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
  }
   
  initilizeStatusList(){
    this.statusList.push({value: 'ALL', label: 'All', isSelected: false});
    this.statusList.push({value: 'OPEN', label: 'Open', isSelected: true});
    this.statusList.push({value: 'CLOSED', label: 'Closed', isSelected: false});
    this.statusList.push({value: 'DELIVERED', label: 'Delivered', isSelected: false});
    this.statusList.push({value: 'CANCELLED', label: 'Cancelled', isSelected: false});
  }


executeSearch() {
   
  let orderSearchCriteria: OrderSearchCriteria = {
    start: this.searchGroup.get('startDate').value.getTime(),
    end: this.searchGroup.get('endDate').value.getTime(),
    status: this.searchGroup.get('orderStatus').value,
  };
  this.searchCriteriaChange.emit(orderSearchCriteria);
}
}

export interface Status {
  value: string;
  label: string;
  isSelected: boolean;
} 

