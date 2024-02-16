import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../dialogs/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from '../dialogs/register-dialog/register-dialog.component';

export const USERS = 'USERS';
export const LOGGED_USER = 'LOGGED_USER';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser = null;

  constructor(private dialog: MatDialog) {}

  initializeSession() {
    try {
      const loggedUser =
        JSON.parse(window.localStorage.getItem(LOGGED_USER) as any) || false;
      if (!!loggedUser) {
        this.startSession(loggedUser);
      }
    } catch {}
  }

  startSession(user) {
    this.loggedUser = user;
    window.localStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }

  registerUser(payload) {
    this.startSession(payload);
  }

  logout() {
    this.loggedUser = null;
    window.localStorage.removeItem(LOGGED_USER);
  }

  openLoginDialog() {
    this.dialog.open(LoginDialogComponent, {
      height: '532px',
      width: '500px',
      disableClose: true,
    });
  }

  openRegisterDialog() {
    this.dialog.open(RegisterDialogComponent, {
      height: '616px',
      width: '500px',
      disableClose: true,
    });
  }
}
