import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Variables, Routes } from './globalVariables';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {

  urlBase: string;
  urlBaseEzgoh: string;
  public mostrarMensaje: boolean = false;

  constructor(private http: HttpClient) {
    this.urlBase = Variables.domain + '/';
    this.urlBaseEzgoh = Variables.domainEzgoh + '/';
  }

  showMessage(variable: boolean = true) {
    this.mostrarMensaje = variable;
  }

  get_dataEzgoh<T>(path: string): Observable<T[]> {
    let subPath = Routes[path];
    return this.http.get<T[]>(this.urlBaseEzgoh + subPath).pipe(map(response => response));
  }

  get_dataIDEzgoh<T>(path: string, id: string) {
    let subPath = Routes[path];
    return this.http.get<T>(this.urlBaseEzgoh + subPath + id).pipe(map(response => response));
  }

  get_data<T>(path: string): Observable<T[]> {
    let subPath = Routes[path];
    return this.http.get<T[]>(this.urlBase + subPath).pipe(map(response => response));
  }

 

  get_dataID<T>(path: string, id: string) {
    let subPath = Routes[path];
    return this.http.get<T>(this.urlBase + subPath + id).pipe(map(response => response));
  }

  get_dataWithParams<T>(path: string, params: string): Observable<T[]> {
    let subPath = Routes[path];
    console.log(this.urlBase + subPath + params);
    
    return this.http.get<T[]>(this.urlBase + subPath + params).pipe(map(response => response));
  }

   add_data<T>(path: string, object: T) {
    let subPath = Routes[path];
    return this.http.post<T>(this.urlBase + subPath + '/', object).pipe(map(response => response));
  }

  edit_data<T>(path: string, object: T) {
    let subPath = Routes[path];
    let xid = object['id'];
    return this.http.put<T>(this.urlBase + subPath + "/" + xid + "/", object).pipe(map(res => res));
  }

  del_data<T>(path: string, id: string) {
    let subPath = Routes[path];
    return this.http.delete<T>(this.urlBase + subPath + '/' + id).pipe(map(response => response));
  }

  del_data2<T>(path: string, params: string, id: string) {
    let subPath = Routes[path];
    return this.http.delete<T>(this.urlBase + subPath + '?' + params + '=' + id).pipe(map(response => response));
  }

  del_data2Params<T>(path: string, param1: string, id1: string, param2: string, id2: string) {
    let subPath = Routes[path];
    console.log('entra');
    console.log(this.urlBase + subPath + '?' + param1 + '=' + id1 + "&" + param2 + "=" +id2);
    return this.http.delete<T>(this.urlBase + subPath + '?' + param1 + '=' + id1 + "&" + param2 + "=" +id2).pipe(map(response => response));
  }

  add_dataWithParams<T>(path: string, params: string, object: T) {
    let subPath = Routes[path];
    console.log(this.urlBase + subPath + params + JSON.stringify(object));
    
    return this.http.post<T>(this.urlBase + subPath + params + JSON.stringify(object), "").pipe(map(response => response));
  }

  add_dataWithParamsOH<T>(path: string, param1: string, valueparam1: string, param2: string, valueparam2: string, param3: string, valueparam3: string) {
    let subPath = Routes[path];
    //console.log(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3);
    return this.http.post<T>(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3, "").pipe(map(response => response));
  }

  add_dataWithParams3P<T>(path: string, param1: string, object: T, param2: string, valueparam2: string, param3: string, valueparam3: string) {
    let subPath = Routes[path];
    console.log('así sale: ',this.urlBase + subPath + param1 + JSON.stringify(object)+ param2 + valueparam2 + param3 + valueparam3);
    
    //console.log(this.urlBase + subPath + param1 + valueparam1 + param2 + valueparam2 + param3 + valueparam3);
    return this.http.post<T>(this.urlBase + subPath + param1 + JSON.stringify(object)+ param2 + valueparam2 + param3 + valueparam3, "").pipe(map(response => response));
  }

  add_dataWithParams2P<T>(path: string, param1: string, object: T, param2: string, valueparam2: string) {
    let subPath = Routes[path];
    console.log(this.urlBase + subPath + param1 + object + param2 + valueparam2);
    return this.http.post<T>(this.urlBase + subPath + param1 + JSON.stringify(object)+ param2 + valueparam2, "").pipe(map(response => response));
  }
}
