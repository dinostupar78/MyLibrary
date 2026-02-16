import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoansService} from '../../../../core/services/loans.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-app-borrow-book',
  imports: [
    FormsModule
  ],
  templateUrl: './app-borrow-book.html',
  styleUrl: './app-borrow-book.css',
})
export class AppBorrowBook {
  @Input() book: any;
  @Output() close = new EventEmitter<void>();
  @Output() borrowed = new EventEmitter<void>();

  borrowDate = '';
  returnDate = '';

  constructor(private loansService: LoansService) {}

  confirmBorrow() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!this.borrowDate || !this.returnDate) {
      alert('Please select dates');
      return;
    }

    this.loansService.borrowBook(
      user.id,
      this.book.id,
      this.borrowDate,
      this.returnDate
    ).subscribe({
      next: () => {
        alert('Book borrowed!');
        this.borrowed.emit();
      },
      error: () => {
        alert('Borrow failed');
      }
    });
  }

}
