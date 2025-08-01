import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { BudgetsComponent } from './budgets.component';
import { BudgetComponent } from './budget.component';
import { GridComponent } from './grid.component';
import { TestWSComponent } from './testWS.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'budgets', component: BudgetsComponent },
  { path: 'budget/:id', component: BudgetComponent },
  { path: 'grid', component: GridComponent },
  { path: 'test', component: TestWSComponent }
];
