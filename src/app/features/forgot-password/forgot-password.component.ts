import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  isShowPassword = signal<string>('password');
  isShowRepassword = signal<string>('password');

  step = signal<number>(1);
  showEmailError = signal<boolean>(false);
  showCodeError = signal<boolean>(false);
  showPasswordError = signal<boolean>(false);

  loadingEmail = signal<boolean>(false);
  loadingCode = signal<boolean>(false);
  loadingNewPassword = signal<boolean>(false);
  emailErrorMessage = signal<string>('');
  codeErrorMessage = signal<string>('');
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  email: FormControl = new FormControl('', [Validators.required, Validators.email])
  code: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{6}$/)])

  newPasswordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword: ['', Validators.required],
  }, { validators: this.confirmPassword })


  confirmPassword(g: AbstractControl) {
    const password = g.get('password')?.value;
    const rePassword = g.get('rePassword')?.value;
    if (password !== rePassword && rePassword !== '') {
      g.get('rePassword')?.setErrors({ mismatch: true })
      return { misMatch: true }
    }
    return null
  }

  submitEmail(e?: Event) {
    if (e) e.preventDefault();

    if (this.email.invalid) {
      this.showEmailError.set(true)
      return
    }
    
    const data = {
      email: this.email.value
    }
    
    e ? this.loadingEmail.set(true) : this.loadingCode.set(true);
    this.authService.forgetPassword(data).subscribe({
      next: res => {
        if (e) {
          this.loadingEmail.set(false)
           this.step.set(2)
        }else{
          this.loadingCode.set(false)
        }
      },
      error: err => {
        e ? this.loadingEmail.set(false) : this.loadingCode.set(false);
        this.emailErrorMessage.set(err.error.message)
      }
    })
  }
  submitCode(e: Event) {
    e.preventDefault();
    if (this.code.invalid) {
      this.showCodeError.set(true)
      return
    }
    const data = {
      resetCode: this.code.value
    }

    this.loadingCode.set(true) 
     this.authService.verifyCode(data).subscribe({
      next: res => {
        this.loadingCode.set(false) 
        this.step.set(3)
      },
      error: err => {
        this.loadingCode.set(false) 
        this.codeErrorMessage.set(err.error.message)
      }
    })


  }
  submitPassword() {
    if (this.newPasswordForm.invalid) {
      this.showPasswordError.set(true)
      return
    }

    const data = {
      email: this.email.value,
      newPassword: this.newPasswordForm.get('rePassword')?.value
    }

    this.loadingNewPassword.set(true) 
     this.authService.resetPassword(data).subscribe({
      next: res => {
        this.loadingNewPassword.set(false) 
        this.router.navigate(['/login'])
      },
      error: err => {
        this.loadingNewPassword.set(false) 
      }
    })

  }
}
