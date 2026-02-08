import { Component } from '@angular/core';
import {FaIconComponent, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {Router, RouterLink} from '@angular/router';
import { faRightToBracket  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  imports: [
    FaIconComponent,
    FontAwesomeModule,


  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router){}

  navbarOpened = false;
  isHovered = false;

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }

  faRightToBracket = faRightToBracket;

}
