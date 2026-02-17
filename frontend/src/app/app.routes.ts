import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {About} from './pages/about/about';
import {Profile} from './pages/profile/profile';
import {Admin} from './pages/admin/admin';
import {Books} from './pages/books/books';
import {BookDetails} from './pages/book-details/book-details';
import {Loans} from './pages/loans/loans';
import {GuestGuard} from './core/guards/guest.guard';
import {AuthGuard} from './core/guards/auth.guard';
import {AdminGuard} from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },

  { path: 'login', component: Login, canActivate: [GuestGuard] },
  { path: 'register', component: Register, canActivate: [GuestGuard] },

  { path: 'admin', component: Admin, canActivate: [AdminGuard] },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'loans', component: Loans, canActivate: [AdminGuard] },

  { path: 'books', component: Books },
  { path: 'books/:id', component: BookDetails },

  { path: '**', redirectTo: '' }
];
