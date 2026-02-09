import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DialogService} from '../../shared/dialog/dialog.service';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  isHovered = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogService: DialogService,
              private authService: AuthService,
              private router: Router ){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onSubmit(){
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid){
      if (this.loginForm.get('username')?.errors?.['required']) {
        this.dialogService.error('Username is required!');
        return;
      }

      if (this.loginForm.get('password')?.errors?.['required']) {
        this.dialogService.error('Password is required!');
        return;
      }

      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (res) => {

        if (!res || !res.token || !res.user) {
          this.dialogService.error('Invalid username or password!');
          return;
        }

        this.authService.saveAuth(res.token, res.user);

        this.dialogService.success('Login successful!')
        this.router.navigate(['/']);

      },
      error: () => {
        this.dialogService.error('Login response invalid!');
      }
    });
  }



}
