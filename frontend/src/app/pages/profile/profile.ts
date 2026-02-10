import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';
import {UsersService} from '../../core/services/users.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  form!: FormGroup;
  user: any;

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

  saveProfile() {
    this.usersService.updateProfile(this.form.value).subscribe(updated => {
      this.authService.saveAuth(
        this.authService.getToken()!,
        updated
      );
    });
  }

  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if(!file)
      return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    this.usersService.updateAvatar(file).subscribe(updated => {
      this.authService.saveAuth(
        this.authService.getToken()!,
        updated
      );
    });
  }


}
