import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit {
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  constructor(private router: Router, private authService: AuthService) {}

  user: any = null;
  profileMenu = false;

  currentYear: number = new Date().getFullYear();

  logout() {
    this.authService.logout();
    this.user = null;
    this.profileMenu = false;
    this.router.navigate(['/login']);
  }


}
