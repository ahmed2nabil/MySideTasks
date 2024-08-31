import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import { Observable, of, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, FlexLayoutModule, MatCardModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  error$: Observable<any>; // For displaying signup errors
  private errorSubscription!: Subscription;

  constructor(private store: Store<{ auth: { error: any } }>, private fb: FormBuilder, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['',[Validators.required]],
    });
    this.error$ = this.store.select((state) =>  state.auth.error); // Select auth error
  }
  ngOnInit() {
    this.errorSubscription = this.error$.subscribe(error => {
      if (error) {
        console.error('Signup error:', error);
      }
    });
  }
  passwordMatchValidator(control: AbstractControl): Observable<ValidationErrors | null>  {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return of({ 'passwordMismatch': true });
    }

    return of(null);
  }
  onSubmit() {
    if (this.signupForm.valid) {
      const userData = this.signupForm.value;
      this.store.dispatch(AuthActions.signupRequest({ username: userData.username, password: userData.password, email: userData.email }));

    }
  }
  goToSignInPage() {
    this.router.navigate(['/signin']);
  }
}
