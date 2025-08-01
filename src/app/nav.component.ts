import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthButtonComponent } from "./authButton.component";
import { AuthUserComponent } from "./authuser.component";

/**
 * The Navigation Component provides the main navigation bar
 * for the Budget Directory application with links to different pages.
 */
@Component({
  selector: 'navigation',
  standalone: true,
  imports: [RouterOutlet, RouterModule, AuthButtonComponent,
    AuthUserComponent],
  templateUrl: './nav.component.html'
})
export class NavComponent {}
