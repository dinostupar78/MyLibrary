import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../core/services/admin.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-admin',
  imports: [
    CommonModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  users: any[] = [];
  API_URL = 'http://localhost:3000';

  constructor(private adminService: AdminService) {}

  load() {
    this.adminService.getUsers().subscribe(u => this.users = u);
  }

  ngOnInit(): void {
    this.load();
  }

  delete(id: string){
    if(!confirm('Delete User?'))
      return;

    this.adminService.deleteUser(id).subscribe(() => {
      this.load();
    });
  }

}
