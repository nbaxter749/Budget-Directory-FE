import { Component } from '@angular/core';
import { BudgetsComponent } from './budgets.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BudgetsComponent, NavComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Budget Directory';
}
