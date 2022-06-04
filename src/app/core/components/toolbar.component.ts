import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar color="primary">
      <ng-content></ng-content>
      <img src="/assets/icon/favicon.png" width="90" height="60" style="padding-right:4px">
      <span class="appTitle">Acacia Ready</span>
    </mat-toolbar>
  `,
  styles: [`
    .appTitle{
      align-self: flex-start;
      font-size: 16px;
      color: rgb(255,165,0);
      padding-top: 8px;
      padding-right: 5px;
      justify: center;
      font-family: Arial;
      font-stretch: expanded;
      font-weight: bold;
      font-variant: small-caps ;
      text-shadow: 4px 4px 4px maroon;
      /* writing-mode: vertical-rl; */
    }  
`]

})
export class ToolbarComponent {

  constructor() {

  }
  
}
