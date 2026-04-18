import { Component, inject, signal } from '@angular/core';
import { FormGroup, Validators, AbstractControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { MystorageService } from '../../../../core/services/mystorage.service';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly mystorageService = inject(MystorageService);
  isShowCurrentPassword = signal<string>('password');
  isShowPassword = signal<string>('password');
  isShowRepassword = signal<string>('password');
  showErrors = signal<boolean>(false);
  loading = signal<boolean>(false);
  isSuccess = signal<boolean>(false)
  Message = signal<string>('')
  changePasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
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


  submitChangePassword() {
    if (this.changePasswordForm.invalid) {
      this.showErrors.set(true)
      return
    }
    this.changePassword(this.changePasswordForm.value)
  }



  changePassword(data: object) {
    if (this.loading()) return
    this.loading.set(true)
    this.authService.changePassword(data).subscribe({
      next: res => {
        this.loading.set(false)
        this.isSuccess.set(true)
        this.Message.set('Password changed successfully')

        if (this.mystorageService.get('freshToken')) {
          localStorage.setItem('freshToken', res.token);
        } else {
          sessionStorage.setItem('freshToken', res.token);
        }
      },
      error: err => {
        this.loading.set(false)
        this.isSuccess.set(false)
        this.Message.set(err.error.errors.msg)

      }
    })


  }
}



