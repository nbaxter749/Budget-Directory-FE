import { Component } from '@angular/core';
import { BudgetsComponent } from './budgets.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav.component';
import { CommonModule } from '@angular/common';

/**
 * The main application component that serves as the root
 * of the Budget Directory application.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetsComponent, NavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * The title of the application
   */
  title = 'Budget Directory FE';
}
