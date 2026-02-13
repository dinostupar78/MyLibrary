import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenresService {
  private API_URL = 'http://localhost:3000/api/genres';

  constructor(private http: HttpClient) {}

  createGenre(name: string) {
    return this.http.post(this.API_URL, { name });
  }

  getGenres(): Observable<any[]> {
    return this.http.get<any[]>(this.API_URL);
  }

  deleteGenre(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }


}
