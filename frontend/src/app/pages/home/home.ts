import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Stats, StatsService} from '../../core/services/stats.service';


@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  stats: Stats = {
    totalBooks: 0,
    totalGenres: 0,
    totalUsers: 0,
    availableCopies: 0
  };

  constructor(
    public authService: AuthService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.statsService.getStats().subscribe({
      next: (data) => {
        // Postgres vraća stringove, pa osiguramo broj
        this.stats = {
          totalBooks: Number(data.totalBooks),
          totalGenres: Number(data.totalGenres),
          totalUsers: Number(data.totalUsers),
          availableCopies: Number(data.availableCopies)
        };
      },
      error: (err) => {
        console.error('Failed to load stats', err);
      }
    });
  }
}
