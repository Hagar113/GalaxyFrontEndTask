import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email_phone: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (value) => {
          if (value.isSuccess) {
            alert(value.msg);
            this.router.navigate(['/wellcome']);
          }
        },
      });
    } else {
      this.ValidateFormFileds(this.loginForm);
      alert('Please fill all the fields');
    }
  }
  private ValidateFormFileds(_FormGroup: FormGroup) {
    Object.keys(_FormGroup.controls).forEach((field) => {
      const control = _FormGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.ValidateFormFileds(control);
      }
    });
  }
}
