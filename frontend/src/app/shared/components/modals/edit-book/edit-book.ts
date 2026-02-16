import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BooksService} from '../../../../core/services/books.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  imports: [
    FormsModule
  ],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})
export class EditBook {

  @Input() book: any;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  constructor(private booksService: BooksService) {}

  save() {
    this.booksService.updateBook(this.book.id, {
      title: this.book.title,
      author: this.book.author,
      description: this.book.description,
      genre_id: this.book.genre_id,
      total_copies: this.book.total_copies
    }).subscribe({
      next: () => this.updated.emit(),
      error: err => alert(err.error?.message || 'Update failed')
    });
  }

  cancel() {
    this.close.emit();
  }
}
