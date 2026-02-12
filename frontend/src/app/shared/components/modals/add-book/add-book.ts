import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BooksService} from '../../../../core/services/books.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  imports: [
    FormsModule
  ],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  @Input() genres: any[] = [];
  @Output() bookCreated = new EventEmitter<void>();

  newBook: any = {
    title: '',
    author: '',
    description: '',
    genre_id: '',
    total_copies: 1
  };

  constructor(private booksService: BooksService){}

  addBook() {
    this.booksService.createBook(this.newBook).subscribe({
      next: () => {
        this.bookCreated.emit();

        this.newBook = {
          title: '',
          author: '',
          description: '',
          genre_id: '',
          total_copies: 1
        };

        const modal = document.getElementById('addBookModal');
        if (modal) {
          const bsModal = (window as any).bootstrap.Modal.getInstance(modal);
          bsModal.hide();
        }
      }
    });





}
