import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {GenresService} from '../../../../core/services/genres.service';

@Component({
  selector: 'app-add-genre',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-genre.html',
  styleUrl: './add-genre.css',
})
export class AddGenre {
  @Output() created = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  name: string = '';

  constructor(private genresService: GenresService) {
  }

  addGenre() {
    if (!this.name.trim()) {
      alert('Genre name is required');
      return;
    }

    this.genresService.createGenre(this.name.trim()).subscribe({
      next: () => {
        this.created.emit();
        this.name = '';
        this.close.emit();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Failed to create genre');
      }
    });
  }

  cancel() {
    this.name = '';
    this.close.emit();
  }

}
