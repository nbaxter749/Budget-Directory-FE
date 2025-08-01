import { Component, OnInit } from '@angular/core';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'budgets',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [WebService],
  templateUrl: './budgets.component.html'
})
export class BudgetsComponent implements OnInit {

  budgets: any = [];
  page: number = 1;

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.loadBudgets();
  }

  loadBudgets() {
    this.webService.getBudgetsPage(this.page)
      .subscribe((response) => {
        this.budgets = response;
      });
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadBudgets();
    }
  }

  nextPage() {
    this.page++;
    this.loadBudgets();
  }
}

