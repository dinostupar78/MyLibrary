import { Component } from '@angular/core';
import {GoogleService} from '../../../../core/services/google.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-search',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './google-search.html',
  styleUrl: './google-search.css',
})
export class GoogleSearch {
  @Output() imported = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  query = '';
  results: any[] = [];
  loading = false;

  constructor(private googleService: GoogleService) {}

  search(){
    if(!this.query)
      return;

    this.loading = true;

    this.googleService.search(this.query).subscribe({
      next: (res) => {
        this.results = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  import(book: any) {
    this.googleService.importBook(book).subscribe({
      next: () => {
        this.imported.emit();
      }
    });
  }

}
