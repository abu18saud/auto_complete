import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) { }

  public getAutocomplete(value:any): Observable<any> {
    return this.http.get<any>('https://wddkstage.azurewebsites.net/api/user/getByPhoneNumber?phoneNumber='+ value);
  }
}
