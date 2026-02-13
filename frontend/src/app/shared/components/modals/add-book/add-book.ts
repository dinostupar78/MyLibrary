import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BooksService} from '../../../../core/services/books.service';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-book',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './add-book.html',
  styleUrl: './add-book.css',
})
export class AddBook {
  @Input() genres: any[] = [];
  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  imageFile!: File | null;
  imagePreview!: string | null;

  newBook: any = {
    title: '',
    author: '',
    description: '',
    genre_id: '',
    total_copies: 1
  };

  constructor(private booksService: BooksService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.imageFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  addBook() {
    if (!this.newBook.title || !this.newBook.author || !this.newBook.genre_id) {
      alert('Title, Author i Genre su obavezni');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newBook.title);
    formData.append('author', this.newBook.author);
    formData.append('description', this.newBook.description || '');
    formData.append('genre_id', this.newBook.genre_id);
    formData.append('total_copies', String(this.newBook.total_copies ?? 1));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.booksService.createBook(formData).subscribe({
      next: () => {
        this.created.emit();
        this.resetForm();
        this.close.emit();
      },
      error: (err) => {
        console.error(err);
        alert('Failed to create book');
      },
    });
  }

  resetForm() {
    this.newBook = {
      title: '',
      author: '',
      description: '',
      genre_id: '',
      total_copies: 1
    };

    this.imageFile = null;
    this.imagePreview = null;
  }

  cancel() {
    this.resetForm();
    this.close.emit();
  }
}







