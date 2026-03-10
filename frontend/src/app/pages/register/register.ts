import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { DialogService } from '../../shared/dialogs/dialog.service';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    MatMiniFabButton,
    MatIcon
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  selectedFile: File | null = null;
  fileName = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', Validators.required],
    }, { validators: passwordsMatch });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.dialog.error('Only image files are allowed');
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;
  }

  onSubmit() {

    if (this.registerForm.invalid) {
      this.showValidationError();
      return;
    }

    const formData = new FormData();
    const { username, name, email, password } = this.registerForm.value;

    formData.append('username', username);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: () => {
        this.dialog.success('Account created successfully!');
        this.router.navigate(['/']);
      },
      error: err => {
        this.dialog.error(err.error?.message || 'Registration failed');
      }
    });
  }

  private showValidationError() {

    const f = this.registerForm;

    if (f.get('username')?.hasError('required'))
      return this.dialog.error('Username is required');

    if (f.get('username')?.hasError('minlength'))
      return this.dialog.error('Username must be at least 4 characters');

    if (f.get('name')?.hasError('required'))
      return this.dialog.error('Name is required');

    if (f.get('password')?.hasError('required'))
      return this.dialog.error('Password is required');

    if (f.get('password')?.hasError('minlength'))
      return this.dialog.error('Password must be at least 4 characters');

    if (f.get('email')?.hasError('required'))
      return this.dialog.error('Email is required');

    if (f.get('email')?.hasError('email'))
      return this.dialog.error('Enter a valid email');

    if (f.hasError('passwordsMismatch'))
      return this.dialog.error('Passwords do not match');

    this.dialog.error('Please fill all fields correctly');
  }
}

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { passwordsMismatch: true };
}
