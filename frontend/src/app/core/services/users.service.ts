import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  private API_URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  getMyProfile() {
    return this.http.get<any>(`${this.API_URL}/me`);
  }

  updateProfile(data: {name: string, email: string}){
    return this.http.put<any>(`${this.API_URL}/me`, data);
  }

  updateAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.put<any>(
      `${this.API_URL}/me/avatar`,
      formData
    );
  }


}
