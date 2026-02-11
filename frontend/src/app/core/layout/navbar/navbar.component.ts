import {Component, HostListener, OnInit} from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';
import {filter} from 'rxjs';

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

  closeMenus() {
    this.profileMenu = false;
    this.navbarOpened = false;
  }

  get isLoggedIn(): boolean {
    return !!this.user;
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

