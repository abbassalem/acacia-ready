import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Authenticate } from '../../models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.css']
})

export  class SignInComponent {
  // @Input()
  // set pending(isPending: boolean) {
  //   if (isPending) {
  //     this.form.disable();
  //   } else {
  //     this.form.enable();
  //   }
  // }

  // @Input() errors: string | null;

  @Output() emailSubmission = new EventEmitter<Authenticate>();
  @Output() providerSubmission = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  });

  constructor() {}

  login() {
    if (this.form.valid) {
      this.emailSubmission.emit(this.form.value);
    } 
  }

  loginWithProvider(providerName){
    this.providerSubmission.emit(providerName);
  }

}
