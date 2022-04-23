import { Injectable, NgZone } from '@angular/core';
import {AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from '../models/user';

@Injectable()
export class AuthService {

  userState: User ;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  SignIn(email, password): Promise<User> {

    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          // TODO: navigage either to basket or  products
          // this.router.navigate(['/']);
        });
        return Promise.resolve(this.SetUserData(result.user));
      })
      .catch((error) => {
        window.alert(error.message);
        return Promise.reject('error in signin');
      });
  }

  SignUp(email, password, extraData) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SendVerificationMail();
        this.SetUserData(result.user, extraData);
        
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['email-verification']);
      });
  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  authProvider(provider):  Promise<User> {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
           this.router.navigate(['/']);
        });
        // this.SetUserData(result.user);
        return Promise.resolve(this.SetUserData(result.user));
      })
      .catch((error) => {
        window.alert(error);
        return Promise.reject('error in login with provider');
      });
  }


  async SetUserData(user, extraData?): Promise<User> {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: this.parseName(user.email),
      photoURL: user.photoURL,
      // phoneNumber: extraData?.phoneNumber,
      emailVerified: user.emailVerified
    };
    await userRef.set(userState, 
      {
        merge: true,
      });
     
      return userState;
  }
  
  parseName(email: string) {
    return email.substring(0,email.indexOf('@'));
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }


}
