import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../shared/dialog/dialog.service';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  isHovered = false;
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private dialogService: DialogService){}

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
  }



}
