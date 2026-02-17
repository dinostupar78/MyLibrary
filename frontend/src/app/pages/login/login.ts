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
    if (this.loginForm.invalid) {
      return this.dialogService.error('Please enter username and password');
    }

    const { username, password } = this.loginForm.value;

    this.authService.login({ username, password }).subscribe({
      next: (res) => {

        this.authService.saveAuth(res.token, res.user);

        this.dialogService.success('Login successful!');
        this.router.navigate(['/']);

      },
      error: () => {
        this.dialogService.error('Invalid credentials');
      }
    });

  }



}
