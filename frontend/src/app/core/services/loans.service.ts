import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export type LoanStatus = 'borrowed' | 'returned';

export interface Loan {
  id: string;
  borrow_date: string;
  return_date: string | null;
  status: LoanStatus;
  user_id: string;
  book_id: string;
  title?: string;
  author?: string;
  image_url?: string;
  genre_name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  private API_URL = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  borrowBook(userId: string, bookId: string, returnDate: string) {
    return this.http.post(this.API_URL, {
      user_id: userId,
      book_id: bookId,
      return_date: returnDate
    });
  }



  getLoans(userId?: string): Observable<any[]> {
    let params = new HttpParams();

    if (userId) {
      params = params.set('user_id', userId);
    }

    return this.http.get<any[]>(this.API_URL, { params });
  }

  returnLoan(loanId: string): Observable<any> {
    return this.http.put(`${this.API_URL}/${loanId}/return`, {});
  }

}
