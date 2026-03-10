import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoansService} from '../../core/services/loans.service';
import {BookStatusPipe} from '../../shared/pipes/book-status-pipe';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/dialogs/dialog.component';

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

  constructor(private loansService: LoansService,
              private dialog: MatDialog) {}

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

    const confirmRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Confirm Return',
        message: 'Are you sure you want to return this book?',
        type: 'confirm'
      }
    });

    confirmRef.afterClosed().subscribe(result => {

      if (!result) return;

      this.loansService.returnLoan(id).subscribe({
        next: () => {

          this.dialog.open(DialogComponent, {
            data: {
              title: 'Return Successful',
              message: 'Book has been successfully returned.',
              type: 'success'
            }
          });

          this.loadLoans();
        },
        error: err => {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Return Failed',
              message: err.error?.message || 'Return failed.',
              type: 'error'
            }
          });
        }
      });

    });
  }

  isOverdue(loan: any): boolean {
    if (loan.status !== 'borrowed') return false;

    const returnDate = new Date(loan.return_date);
    return returnDate < this.today;
  }
}
