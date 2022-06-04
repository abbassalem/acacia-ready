// import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from './../../../auth/reducers/auth.reducer';
import * as fromAuthAction from './../../actions/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {

  registerForm: FormGroup;
  
  constructor(private store: Store<fromAuth.State>) {
  }
  
  ngOnInit(){  
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [ Validators.required]),
      passwordRetype: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    },
    { 
      validators: [this.checkPasswords, this.minLengthCheck]
    }
    );  
  }

  register(){
    this.store.dispatch(new fromAuthAction.Signup(
      {
        email: this.registerForm.get('email').value,
        password: this.registerForm.get('password').value,
        extraData: {
            fullName: this.registerForm.get('fullName').value, 
            phoneNumber: this.registerForm.get('phoneNumber').value}
      }   
    ));
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls['password'].value;
    const confirmPass = group.controls['passwordRetype'].value;
    return pass === confirmPass ? null : { notSame: true };
  }
    
  minLengthCheck (group: FormGroup){
    const pass = <string>group.controls['password'].value;
    if(pass.length <6){
      return {minLength: true}
    } else {
      return null;
    }
  }

}

