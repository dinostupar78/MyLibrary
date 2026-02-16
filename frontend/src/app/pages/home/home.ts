import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import {StatsService} from '../../core/services/stats.service';

interface StatCard {
  label: string;
  value: number;
  max: number;
  offset: number;
}

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

  statCards: StatCard[] = [];
  topBooks: any[] = [];

  private radius = 60;
  private circumference = 2 * Math.PI * this.radius;

  constructor(public authService: AuthService, private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadTopBooks();
  }

  loadStats() {
    this.statsService.getStats().subscribe(data => {
      this.statCards = [
        { label: 'Total Books', value: Number(data.totalBooks), max: 100, offset: this.circumference },
        { label: 'Genres', value: Number(data.totalGenres), max: 20, offset: this.circumference },
        { label: 'Registered Users', value: Number(data.totalUsers), max: 100, offset: this.circumference },
        { label: 'Available Copies', value: Number(data.availableCopies), max: 200, offset: this.circumference },
        { label: 'Borrowed Books', value: Number(data.borrowedBooks), max: 100, offset: this.circumference },
        { label: 'Returned Books', value: Number(data.returnedBooks), max: 100, offset: this.circumference }
      ];

      setTimeout(() => this.animateCircles(), 200);
    });
  }

  loadTopBooks() {
    this.statsService.getTopBooks().subscribe(data => {
      this.topBooks = data;
    });
  }


  animateCircles() {
    this.statCards.forEach(card => {
      const percent = card.value > 0 ? Math.min(card.value / (card.max || card.value), 1) : 0;
      card.offset = this.circumference - percent * this.circumference;
    });
  }
}
