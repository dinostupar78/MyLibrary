import {Component, EventEmitter, Input, Output} from '@angular/core';
import {BooksService} from '../../../../core/services/books.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-edit-book',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.css',
})

export class EditBook {

  @Input() book: any;
  @Output() close = new EventEmitter<void>();
  @Output() updated = new EventEmitter<void>();

  imageFile!: File | null;
  imagePreview!: string | null;

  API_URL = 'http://localhost:3000';

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    if (this.book?.image_url) {
      this.imagePreview = this.API_URL + this.book.image_url;
    }
  }

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

  save() {
    const formData = new FormData();

    formData.append('title', this.book.title);
    formData.append('author', this.book.author);
    formData.append('description', this.book.description || '');
    formData.append('genre_id', this.book.genre_id);
    formData.append('total_copies', String(this.book.total_copies));

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.booksService.updateBook(this.book.id, formData).subscribe({
      next: () => this.updated.emit(),
      error: err => alert(err.error?.message || 'Update failed')
    });
  }

  cancel() {
    this.close.emit();
  }
}

