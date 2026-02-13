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

  private radius = 60;
  private circumference = 2 * Math.PI * this.radius;

  constructor(public authService: AuthService, private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.statsService.getStats().subscribe(data => {
      this.statCards = [
        { label: 'Total Books', value: Number(data.totalBooks), max: 100, offset: this.circumference },
        { label: 'Genres', value: Number(data.totalGenres), max: 20, offset: this.circumference },
        { label: 'Registered Users', value: Number(data.totalUsers), max: 100, offset: this.circumference },
        { label: 'Available Copies', value: Number(data.availableCopies), max: 200, offset: this.circumference },
        { label: 'Borrowed Books', value: 0, max: 100, offset: this.circumference },
        { label: 'Active Members', value: 0, max: 100, offset: this.circumference }
      ];

      setTimeout(() => this.animateCircles(), 200);
    });
  }

  animateCircles() {
    this.statCards.forEach(card => {
      const percent = Math.min(card.value / card.max, 1);
      card.offset = this.circumference - percent * this.circumference;
    });
  }
}
