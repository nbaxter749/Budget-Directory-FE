import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

/**
 * The AuthButton Component provides authentication functionality
 * with login and logout buttons for the Budget Directory application.
 */
@Component({
  selector: 'auth-button',
  templateUrl: 'authbutton.component.html',
  standalone: true,
  imports: [AsyncPipe, CommonModule],
  providers: [Router]
})

export class AuthButtonComponent {
  /**
   * The constructor for the AuthButton Component
   * @param document Injecting the Document for DOM access
   * @param auth Injecting the AuthService for authentication functionality
   * @param router Injecting the Router for navigation
   */
  constructor(@Inject(DOCUMENT) public document: Document,
  public auth: AuthService,
  public router: Router) {}
}
