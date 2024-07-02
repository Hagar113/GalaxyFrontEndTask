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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      userName: ['', Validators.required],
      Mobile: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
  Register() {
    if (this.RegisterForm.valid) {
      this.authService.register(this.RegisterForm.value).subscribe({
        next: (value) => {
          if (value.isSuccess) {
            alert(value.msg);
            this.router.navigate(['/login']);
          }
        },
      });
    } else {
      this.ValidateFormFileds(this.RegisterForm);
      alert('Please fill all the fields');
    }
  }
  private ValidateFormFileds(_FormGroup: FormGroup) {
    Object.keys(_FormGroup.controls).forEach((field) => {
      const control = _FormGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.ValidateFormFileds(control);
      }
    });
  }
}
