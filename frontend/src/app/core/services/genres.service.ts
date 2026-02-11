import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private API_URL = 'http://localhost:3000/api/genres';

  constructor(private http: HttpClient) {}

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

}
