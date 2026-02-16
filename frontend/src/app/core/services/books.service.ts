import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private API_URL = 'http://localhost:3000/api/books';

  constructor(private http: HttpClient) {}

  getAllBooks(genreId?: string): Observable<any> {
    let params = new HttpParams();

    if (genreId) {
      params = params.set('genre', genreId);
    }

    return this.http.get<any[]>(this.API_URL, { params });
  }

  getBookById(id: string) {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  createBook(formData: FormData): Observable<any> {
    return this.http.post(this.API_URL, formData);
  }

  updateBook(id: string, data: any) {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }


  deleteBook(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

}
