import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {

  private API_URL: string = 'http://localhost:3000/api/google';

  constructor(private http: HttpClient) { }

  search(query: string):Observable<any>{
    return this.http.get(`${this.API_URL}/search?q=${query}`);
  }

  importBook(book: any): Observable<any>{
    return this.http.post(`${this.API_URL}/import`, book);
  }

}
