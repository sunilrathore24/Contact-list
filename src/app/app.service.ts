import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {

  constructor( private _http: HttpClient){}

  getContactsList(): Observable<any>  {
    const url = `https://my-json-server.typicode.com/voramahavir/contacts-mock-response/contacts`;
    return this._http.get(url);
  }
}
