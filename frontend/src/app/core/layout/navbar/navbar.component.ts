import {Component, HostListener, OnInit} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    FaIconComponent,
    FontAwesomeModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {

  isHovered = false;
  navbarOpened = false;
  profileMenu = false;
  isAdmin = false;
  isLoggedIn = false;

  faRightToBracket = faRightToBracket;
  API_URL = 'http://localhost:3000';

  user: any = null;

  constructor(private router: Router, private authService: AuthService) {}

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }

  closeMenus() {
    this.profileMenu = false;
    this.navbarOpened = false;
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

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    this.isAdmin = user?.role === 'admin';
    this.isLoggedIn = !!user?.id;

    this.authService.user$.subscribe(user => {
      this.user = user;
    });

  }
}

