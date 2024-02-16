import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss'],
})
export class LoginDialogComponent {
  form: FormGroup;

  get email() {
    return this.form.get('email') as any;
  }

  constructor(
    private apiService: ApiService, 
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<LoginDialogComponent>
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  openRegister() {
    this.dialogRef.close();
    this.authService.openRegisterDialog();
  }

  onSubmit() {
    if (this.form.invalid) {
      this.validateAllFormFields(this.form);
      return;
    }
    
    this.apiService.loginUser(this.form.value).subscribe(
      response => {
        this.authService.startSession(response);
        this.dialogRef.close();
        console.log(response);
    
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.markAsDirty();
      } else {
        this.validateAllFormFields(control as FormGroup);
      }
    });
  }
}
