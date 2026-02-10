import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AdminService {

  private API_URL = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<any[]>(`${this.API_URL}/users`);
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.API_URL}/users/${id}`);
  }

}
