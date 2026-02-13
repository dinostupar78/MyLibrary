import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {DialogService} from '../../shared/dialog/dialog.service';
import {MatMiniFabButton} from '@angular/material/button';
import {AuthService} from '../../core/services/auth.service';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-register',
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
  constructor(private authService: AuthService,
              private router: Router,
              private formBuilder: FormBuilder,
              private dialogService: DialogService) {}

  isHovered = false;
  registerForm!: FormGroup;

  fileName = '';
  selectedFile: File | null = null;



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      imageAvatar: ['']
    }, {validators: passwordsMatch});

  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];

    if (!file.type.startsWith('image/')) {
      this.dialogService.error('Only images allowed');
      return;
    }

    this.selectedFile = file;
    this.fileName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);
  }

  onSubmit(){
    this.registerForm.markAllAsTouched();

    if(this.registerForm.invalid){
      if(this.registerForm.get('username')?.errors?.['required']){
        this.dialogService.error('Username already exists!');
        return;
      }

      if(this.registerForm.get('username')?.errors?.['minlength']){
        this.dialogService.error('Username must have at least 4 characters!');
        return;
      }

      if (this.registerForm.get('password')?.errors?.['required']) {
        this.dialogService.error('Password is required!');
        return;
      }

      if (this.registerForm.errors?.['passwordsMismatch']) {
        this.dialogService.error('Passwords do not match!');
        return;
      }

      if(this.registerForm.get('name')?.errors?.['required']) {
        this.dialogService.error('Name is required!');
        return;
      }

      if (this.registerForm.get('email')?.errors?.['required']) {
        this.dialogService.error('Email is required!');
        return;
      }

      if (this.registerForm.get('email')?.errors?.['email']) {
        this.dialogService.error('Please enter a valid email!');
        return;
      }

      this.dialogService.error('Please fill in all required fields!');
      return;

    }

    const formData = new FormData();

    formData.append('username', this.registerForm.value.username);
    formData.append('name', this.registerForm.value.name);
    formData.append('email', this.registerForm.value.email);
    formData.append('password', this.registerForm.value.password);

    if (this.selectedFile) {
      formData.append('avatar', this.selectedFile);
    }

    this.authService.register(formData).subscribe({
      next: () => this.router.navigate(['/login']),

      error: err => {
        console.log('REGISTER ERROR', err);
        this.dialogService.error(err.error?.message || 'Register failed');
      }
    });

    const {username, password, name, email} = this.registerForm.value;

  }


}

function passwordsMatch(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { passwordsMismatch: true };
}
