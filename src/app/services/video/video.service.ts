import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {map} from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Video } from '../../models/video/videoModel'

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public baseURL: string;

  constructor(
    private _http: HttpClient
  ) { 
    this.baseURL = "http://localhost:3000"
  }

  /** 
   * SECCION DE METODOS REST
   * @SECTIONREST
   */

  getVideos():Observable<any>{
    return this._http.get(`${this.baseURL}/video`).pipe( map( res => res ) );
  }

  postVideo(video: Video):Observable<any>{
    return this._http.post(`${this.baseURL}/video`, video).pipe( map( res => res ) );
  }

  putVideo(id: string, video: Video):Observable<any>{
    return this._http.put(`${this.baseURL}/video/${id}`, video).pipe( map( res => res ) );
  }

  deleteVideo(id: string):Observable<any>{
    return this._http.delete(`${this.baseURL}/video/${id}`).pipe( map( res => res ) );
  }
}
