import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {BooksService} from '../../core/services/books.service';


@Component({
  selector: 'app-book-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails implements OnInit {

  API_URL = 'http://localhost:3000';

  book: any = null;
  loading = true;

  constructor(private route: ActivatedRoute, private booksService: BooksService) {}

  getBookImage() {
    if (!this.book?.image_url) {
      return 'public/bookPlaceholder.png';
    }

    if (this.book.image_url.startsWith('http')) {
      return this.book.image_url;
    }

    return this.API_URL + this.book.image_url;
  }

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');

      if (id) {
        this.booksService.getBookById(id).subscribe({
          next: (data) => {
            this.book = data;
            this.loading = false;
          },
          error: () => {
            this.loading = false;
          }
        });
      }
    }

}


