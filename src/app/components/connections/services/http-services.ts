import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { api_url, api_base_url, authToken, userInformationId} from '../api-config';

@Injectable({
  providedIn: 'root'
})

export class HttpServices {
  constructor(private _http: HttpClient) { }

  httpHeader = new HttpHeaders({
    'content-type': 'application/json',
    'Accept': 'application/json'
  })

  httpHeaderWithToken = new HttpHeaders({
    'Accept': 'application/json',
    'content-type': 'application/json',
    'UserInformationId': `${userInformationId}`,
    'Authorization': `${authToken}`,
  })

  health(): Observable<any>{
    return this._http.get(`${api_url}`, {headers: this.httpHeaderWithToken})
  }

  get(url: any, params: any = null): Observable<any>{
    const converted_params = this.configureParams(params)
    return this._http.get(`${api_base_url}${url}${converted_params}`, {headers: this.httpHeaderWithToken})
  }

  put(url: any, obj: any){
    return this._http.put(`${api_base_url}${url}`, obj, {headers: this.httpHeaderWithToken})
  }

  delete(url: any){
    return this._http.delete(`${api_base_url}${url}`, {headers: this.httpHeaderWithToken})
  }

  post(url: any, obj: any){
    return this._http.post(`${api_base_url}${url}`, obj, {headers: this.httpHeaderWithToken})
  }

  configureParams(params:any){
    let paramsString = ""
    if(params){
      params.forEach((element: any, index: number) => {
        if(index == 0){
          paramsString += `?${element.key}=${element.value}`
        }

        if(index > 0 && params.length > 1){
          paramsString += `&${element.key}=${element.value}`
        }
      });
    }
    return paramsString
  }

}
