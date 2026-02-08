import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from '../../shared/dialog/dialog.service';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private dialogService: DialogService) {}

  isHovered = false;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', Validators.required],
      name: ['', Validators.required],
    }, {validators: passwordsMatch});


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

    const {username, password, name, email} = this.registerForm.value;

  }


}

function passwordsMatch(control: FormControl, form: FormGroup) {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? true : {passwordMismatch: true};
}
