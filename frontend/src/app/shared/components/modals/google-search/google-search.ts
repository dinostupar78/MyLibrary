import {Component, Input} from '@angular/core';
import {GoogleService} from '../../../../core/services/google.service';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import {DialogComponent} from '../../../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

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
  @Input() results: any[] = [];
  @Output() imported = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  query = '';
  loading = false;
  importSuccess = false;
  importError = false;

  constructor(private googleService: GoogleService,
              private dialog: MatDialog,) {}

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

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Import Successful',
            message: 'Book has been successfully imported into the library.',
            type: 'success'
          }
        });

      },
      error: () => {

        this.dialog.open(DialogComponent, {
          data: {
            title: 'Import Failed',
            message: 'Something went wrong while importing the book.',
            type: 'error'
          }
        });

      }
    });
  }

}
