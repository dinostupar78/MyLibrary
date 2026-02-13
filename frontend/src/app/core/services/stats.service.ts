import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Stats {
  totalBooks: number;
  totalGenres: number;
  totalUsers: number;
  availableCopies: number;
}

@Injectable({
  providedIn: 'root',
})
export class StatsService {

  private API_URL = 'http://localhost:3000/api/stats';

  constructor(private http: HttpClient) {}

  getStats(): Observable<Stats> {
    return this.http.get<Stats>(this.API_URL);
  }

}
