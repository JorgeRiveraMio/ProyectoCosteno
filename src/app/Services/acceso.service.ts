import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../Interfaces/ResponseAcceso';
import { Usuario } from '../Interfaces/Usuario';
import { Login } from '../Interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private http =inject(HttpClient)
  private baseUrl:string = appsettings.apiUrl;
  constructor() { }

  registrarse(objeto:Usuario):Observable<ResponseAcceso>
  {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/auth/register`,objeto)
  }
  login(objeto:Login):Observable<ResponseAcceso>
  {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}/auth/login`,objeto)
  }
}
