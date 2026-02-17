import { Component, EventEmitter, Input, Output } from '@angular/core';
import {LoansService} from '../../../../core/services/loans.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-loan',
  imports: [
    FormsModule
  ],
  templateUrl: './add-loan.html',
  styleUrl: './add-loan.css',
})
export class AddLoan {
  @Input() book: any;
  @Output() close = new EventEmitter<void>();
  @Output() borrowed = new EventEmitter<void>();


  returnDate = '';

  constructor(private loansService: LoansService) {}

  borrow() {
    if (!this.returnDate) {
      alert('Please select return date');
      return;
    }

    this.loansService.borrowBook(this.book.id, this.returnDate)
      .subscribe({
        next: () => {
          this.borrowed.emit();
          this.close.emit();
        },
        error: err => {
          alert(err.error?.message || 'Borrow failed');
        }
      });

  }

}
