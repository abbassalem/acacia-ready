import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable()
export class ConfigService {


  constructor(private db: AngularFirestore) {
  }

  // getConfig() {
  //   return this.http.get<any>(this.endpoint + '/config');
  // }


  getDeliveryTimes (): Promise<string[]>{
    // TODO: 
    // return this.db.collection('/deliveryTimes');
    return Promise.resolve(environment.deliveryTimes);
  }

}

