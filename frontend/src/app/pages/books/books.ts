import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenresService} from '../../core/services/genres.service';
import {BooksService} from '../../core/services/books.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  API_URL = 'http://localhost:3000';

  books: any[] = [];
  genres: any[] = [];
  selectedGenreId: string = '';

  loading = false;

  isAdmin = false;

  constructor(private booksService: BooksService, private genresService: GenresService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user?.role === 'admin';

    this.loadGenres();
    this.loadBooks();

  }

  loadGenres(){
    this.genresService.getGenres().subscribe(genres => {
      console.log('GENRES FROM API:', genres);
      this.genres = genres;
    });
  }


  loadBooks(){
    console.log('Selected genre:', this.selectedGenreId);
    this.loading = true;
    this.booksService.getAllBooks(this.selectedGenreId).subscribe({
      next: data => {this.books = data; this.loading = false;},
      error: () => {this.loading = false;}
    });
  }

  onGenreChange(){
    this.loadBooks()
  }

  openAddBook() {
    // za sada samo test
    console.log('Open add book form');
  }

  deleteBook(id: string) {
    if (!confirm('Delete this book?')) return;

    this.booksService.deleteBook(id).subscribe(() => {
      this.loadBooks();
    });
  }



}
