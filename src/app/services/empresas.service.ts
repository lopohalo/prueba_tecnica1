import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { Empresa } from 'src/models/empresa';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

    url_api = 'http://localhost:4000/api';

    constructor( private http: HttpClient) { }

    getEmpresas(): Observable<any>{
        return this.http.get(`${this.url_api}/obtener-empresas`)
    }

  




    // deleteContacto(id:String):Observable<any>{
    //     return this.http.delete(`${this.url_api}/borrar-contacto/${id}`)
    // }
}
