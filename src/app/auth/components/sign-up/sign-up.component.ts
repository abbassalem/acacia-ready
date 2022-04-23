import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// import ComparePassword from 'src/app/shared/validators/comparePassword.validator';
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
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      passwordRetype: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required)
    }
    // {
    //   validator: ComparePassword('password', 'passswordVerification')
    // }
  );
  }
  
  ngOnInit(){

    
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
  

  // loginWithProvider(providerName){
  //   this.providerSubmission.emit(providerName);
  // }

  

}