import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {GenresService} from '../../core/services/genres.service';
import {BooksService} from '../../core/services/books.service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {AddBook} from '../../shared/components/modals/add-book/add-book';
import {AddGenre} from '../../shared/components/modals/add-genre/add-genre';
import {LoansService} from '../../core/services/loans.service';
import {AddLoan} from '../../shared/components/modals/add-loan/add-loan';
import {EditBook} from '../../shared/components/modals/edit-book/edit-book';
import {GoogleSearch} from '../../shared/components/modals/google-search/google-search';

@Component({
  selector: 'app-books',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    AddBook,
    AddGenre,
    AddLoan,
    EditBook,
    GoogleSearch
  ],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  API_URL = 'http://localhost:3000';

  isLoggedIn = false;

  books: any[] = [];
  genres: any[] = [];
  selectedGenreId: string = '';

  loading = false;

  isAdmin = false;

  showAddBookModal = false;
  showAddGenreModal = false;
  showBorrowModal = false;
  showEditBookModal = false;

  selectedBook: any = null;
  selectedBookForEdit: any = null;

  constructor(private booksService: BooksService,
              private genresService: GenresService,
              private loansService: LoansService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.isAdmin = user?.role === 'admin';
    this.isLoggedIn = !!user?.id;

    this.loadGenres();
    this.loadBooks();

  }

  openAddBook(){
    this.showAddBookModal = true;
  }

  closeAddBook(){
    this.showAddBookModal = false;
  }

  openAddGenre(){
    this.showAddGenreModal = true;
  }

  closeAddGenre(){
    this.showAddGenreModal = false;
  }


  loadGenres(){
    this.genresService.getGenres().subscribe(genres => {
      this.genres = genres;
    });
  }


  loadBooks(){
    this.loading = true;
    this.booksService.getAllBooks(this.selectedGenreId).subscribe({
      next: data => {this.books = data; this.loading = false;},
      error: () => {this.loading = false;}
    });
  }

  onBookCreated(){
    this.loadBooks();
    this.closeAddBook()
  }

  onGenreCreated(){
    this.loadGenres();
    this.closeAddGenre();
  }

  onGenreChange(){
    this.loadBooks()
  }


  deleteBook(id: string) {
    if (!confirm('Delete this book?')) return;

    this.booksService.deleteBook(id).subscribe({
      next: () => {
        this.loadBooks();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Cannot delete book');
      }

    })
  }

  deleteGenre(id: string) {
    if (!confirm('Delete this genre?'))
      return;

    this.genresService.deleteGenre(id).subscribe({
      next: () => {
        this.selectedGenreId = '';
        this.loadGenres();
        this.loadBooks();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Cannot delete genre');
      }
    });
  }

  openBorrowModal(book: any) {
    const user: any = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.id) {
      alert('You must be logged in!');
      return;
    }

    this.selectedBook = book;
    this.showBorrowModal = true;

  }

  closeBorrowModal() {
    this.showBorrowModal = false;
    this.selectedBook = null;
  }

  onBorrowSuccess() {
    this.closeBorrowModal();
    this.loadBooks();
  }

  openEditBook(book: any) {
    this.selectedBookForEdit = { ...book }; // clone
    this.showEditBookModal = true;
  }

  closeEditBook() {
    this.showEditBookModal = false;
    this.selectedBookForEdit = null;
  }

  onBookUpdated() {
    this.loadBooks();
    this.closeEditBook();
  }

  showGoogleModal = false;

  openAddBookFromGoogle() {
    this.showGoogleModal = true;
  }

  closeGoogleModal() {
    this.showGoogleModal = false;
  }

  onGoogleImport() {
    this.loadBooks();
    this.closeGoogleModal();
  }

}
