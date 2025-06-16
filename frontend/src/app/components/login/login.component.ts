import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-login-comp',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginCompComponent {
  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(private router: Router, public loginService: LoginServiceService) {

    this.email = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });


  }

  onSubmit(): void {
    this.loginService.login(this.email.value, this.password.value).subscribe({
      next: (data) => {
          this.router.navigate(['home']);
          localStorage.setItem('user', JSON.stringify(data));
      },
      error: (error) => {
        console.log(error);
      }
    })

    this.loginForm.reset();
  }
}
