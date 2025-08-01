import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-profile',
  templateUrl: 'authuser.component.html',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
})
export class AuthUserComponent {
  /**
   * The constructor for the AuthUser Component
   * @param auth Injecting the AuthService for user authentication data
   */
  constructor(public auth: AuthService) {}
}
