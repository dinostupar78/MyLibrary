import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoansService} from '../../core/services/loans.service';
import {BookStatusPipe} from '../../shared/pipes/book-status-pipe';

@Component({
  selector: 'app-loans',
  imports: [CommonModule,
            BookStatusPipe],
  templateUrl: './loans.html',
  styleUrl: './loans.css',
})

export class Loans implements OnInit {

  loans: any[] = [];
  today = new Date();

  constructor(private loansService: LoansService) {}

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.id) {
      alert('You must be logged in');
      return;
    }

    this.loansService.getLoans(user.id)
      .subscribe({
        next: (data) => this.loans = data,
        error: (err) => console.error(err)
      });
  }

  returnBook(id: string) {
    if (!confirm('Return this book?')) return;

    this.loansService.returnLoan(id).subscribe({
      next: () => {
        this.loadLoans();
      },
      error: err => alert(err.error?.message || 'Return failed')
    });
  }

  isOverdue(loan: any): boolean {
    if (loan.status !== 'borrowed') return false;

    const returnDate = new Date(loan.return_date);
    return returnDate < this.today;
  }
}
