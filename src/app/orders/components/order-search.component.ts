import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DurationWithStatus } from 'src/app/shop/models/order.model';

@Component({
  selector: 'app-order-search',
  template: `
  <br>
  <form [formGroup]="searchGroup">
    <mat-card>
      <mat-card-subtitle><small><b>Search order</b></small></mat-card-subtitle>
        <mat-card-content>
            <mat-form-field>
                  <input  matInput [matDatepicker]="picker1" placeholder="Choose start date" formControlName="startDate">
                  <mat-datepicker-toggle matSuffix [for]="picker1"></mat-datepicker-toggle>
                  <mat-datepicker #picker1></mat-datepicker>
            </mat-form-field>
            <mat-form-field>
                  <input matInput [matDatepicker]="picker2" placeholder="Choose end date" formControlName="endDate">
                  <mat-datepicker-toggle matSuffix [for]="picker2"></mat-datepicker-toggle>
                  <mat-datepicker #picker2></mat-datepicker>
            </mat-form-field>
              
            <mat-form-field>
                  <mat-select formControlName="orderStatus">
                    <mat-option *ngFor= "let status of statusList" [value]="status.value" 
                      [selected]="status.isSelected">{{status.label}}
                    </mat-option>
                  </mat-select>
            </mat-form-field>

            <mat-spinner [class.show]="searching" [diameter]="30" [strokeWidth]="3"></mat-spinner>
            <button mat-raised-button color="accent" [disabled]="!searchGroup.valid" (click) = "executeSearch()">
                <mat-icon>search</mat-icon>Search
            </button>
        
        </mat-card-content>
  </mat-card>
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
  @Output() searchWithDates = new EventEmitter<DurationWithStatus>();
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
        orderStatus: new FormControl('OPEN')
      }
    );
  }

  executeSearch() {
    let durationWithStatus: DurationWithStatus = {
      start: this.searchGroup.get('startDate').value.getTime(),
      end: this.searchGroup.get('endDate').value.getTime(),
      status: this.searchGroup.get('orderStatus').value
    };
    this.searchWithDates.emit(durationWithStatus);
  }

  initilizeStatusList(){
    this.statusList.push({value: 'ALL', label: 'All', isSelected: false});
    this.statusList.push({value: 'OPEN', label: 'Open', isSelected: true});
    this.statusList.push({value: 'CLOSED', label: 'Closed', isSelected: false});
    this.statusList.push({value: 'DELIVERED', label: 'Delivered', isSelected: false});
    this.statusList.push({value: 'CANCELLED', label: 'Cancelled', isSelected: false});
  }
}

export interface Status {
  value: string;
  label: string;
  isSelected: boolean;
} 

