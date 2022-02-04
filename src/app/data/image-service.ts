import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ImageResults } from '../model/models';
// import { response } from './response';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  fetchImages(filter: string, page: number, limit: number): Observable<ImageResults> {
    return this.doFetch(filter, page, limit);
  }

  private doFetch(filter: string, page: number, limit: number): Observable<ImageResults> {
    const url = `https://api.pexels.com/v1/search?query=${filter}&per_page=${limit}&page=${page}}`
    return this.http.get<ImageResults>(url, {headers: {Authorization: '563492ad6f91700001000001cf90ff95995f419da77b43146fa201e6'}});
    // for testing without the api
    // return of(response);
  }
}