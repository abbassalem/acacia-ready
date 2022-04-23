import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';


@Injectable()
export class AppConfigService {

  endpoint = environment;

  constructor(private http: HttpClient) {
  }

  getConfig (): Observable<any> {
    return this.http.get(this.endpoint+ '/config');
  }

}

