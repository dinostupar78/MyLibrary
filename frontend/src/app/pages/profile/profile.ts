import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {UsersService} from '../../core/services/users.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  form!: FormGroup;
  user: any;

  editingField: 'name' | 'email' | null = null;
  avatarFile: File | null = null;
  avatarPreview: string | null = null;

  API_URL = "http://localhost:3000";

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.usersService.getMyProfile().subscribe(user => {
      this.user = user;

      this.form = this.fb.group({
        name: [user.name, Validators.required],
        email: [user.email, Validators.required],
      });
    });
  }


  startEdit(field: 'name' | 'email') {
    this.editingField = field;
  }

  cancelEdit() {
    this.form.patchValue({
      name: this.user.name,
      email: this.user.email
    });
    this.editingField = null;
  }

  saveProfile() {
    this.usersService.updateProfile(this.form.value).subscribe(updated => {
      this.user = updated;

      this.authService.saveAuth(
        this.authService.getToken()!,
        updated
      );

      this.editingField = null;
    });
  }

  onAvatarSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    this.avatarFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  confirmAvatar() {
    if (!this.avatarFile) return;

    this.usersService.updateAvatar(this.avatarFile).subscribe(updated => {
      this.user = {
        ...this.user,
        user_image_url: updated.user_image_url
      };

      this.authService.saveAuth(
        this.authService.getToken()!,
        this.user
      );

      this.avatarFile = null;
      this.avatarPreview = null;
    });
  }

  cancelAvatar() {
    this.avatarFile = null;
    this.avatarPreview = null;
  }


}
