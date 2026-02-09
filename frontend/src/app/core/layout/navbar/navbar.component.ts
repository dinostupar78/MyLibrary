import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Router, RouterLink} from '@angular/router';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  isHovered = false;
  navbarOpened = false;
  profileMenu = false;

  faRightToBracket = faRightToBracket;
  API_URL = 'http://localhost:3000';

  user: any = null;

  constructor(private router: Router, private authService: AuthService) {}

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
  }

  get profileInitials(): string {
    if (!this.user?.name) return '';
    return this.user.name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase();
  }

  toggleProfileMenu(event: MouseEvent) {
    event.stopPropagation();
    this.profileMenu = !this.profileMenu;
  }

  @HostListener('document:click')
  closeOnOutsideClick() {
    this.profileMenu = false;
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.profileMenu = false;
    this.router.navigate(['/login']);
  }
}

