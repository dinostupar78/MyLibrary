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

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'admin', component: Admin },
  { path: 'profile', component: Profile },
  { path: 'books', component: Books },
  { path: 'loans', component: Loans },
  { path: 'books/:id', component: BookDetails },


  { path: '**', redirectTo: '' }


];
