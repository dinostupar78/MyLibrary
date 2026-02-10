import { Routes } from '@angular/router';
import {Home} from './pages/home/home';
import {Login} from './pages/login/login';
import {Register} from './pages/register/register';
import {About} from './pages/about/about';
import {Profile} from './pages/profile/profile';
import {Admin} from './pages/admin/admin';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'about', component: About },
  { path: 'admin', component: Admin },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: '' }


];
