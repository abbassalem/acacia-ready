import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  success:string;

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.success = params.get('success');
    })
  }

}
