import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo/photoModel'

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public baseURL: String;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseURL = "http://localhost:3000"
  }

  /** 
   * SECCION DE METODOS REST
   * @SECTIONREST
   */

  getPhotos():Observable<any>{
    return this._http.get(`${this.baseURL}/photo`).pipe( map( res => res ) );
  }

  postPhoto(photo: Photo):Observable<any>{
    return this._http.post(`${this.baseURL}/photo`, photo).pipe( map( res => res ) );
  }

  putPhoto(id: String, photo: Photo):Observable<any>{
    return this._http.put(`${this.baseURL}/photo/${id}`, photo).pipe( map( res => res ) );
  }

  deletePhoto(id: String):Observable<any>{
    return this._http.delete(`${this.baseURL}/photo/${id}`).pipe( map( res => res ) );
  }

}
