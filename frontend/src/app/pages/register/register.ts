import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

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
                private formBuilder: FormBuilder) {}

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
        // ispis greske
        return;
      }
    }
  }


}

function passwordsMatch(control: FormControl, form: FormGroup) {
  const password = control.get('password')?.value;
  const repeatPassword = control.get('repeatPassword')?.value;

  return password === repeatPassword ? true : {passwordMismatch: true};
}
