import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'budgets',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  providers: [DataService, WebService],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
})
export class BudgetsComponent {
  budget_list: any = [];
  page: number = 1;

  /**
   * The constructor for the Budgets Component
   * @param dataService Injecting the DataService for pagination calculations
   * @param webService Injecting the WebService for API calls
   */
  constructor(public dataService: DataService, private webService: WebService) {}

  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.webService.getBudgetsPage(this.page).subscribe((response) => {
      this.budget_list = response;
    });
  }

  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.webService.getBudgetsPage(this.page).subscribe((response) => {
        this.budget_list = response;
      });
    }
  }

  nextPage() {
    if (this.page < this.dataService.getLastPageNumber()) {
      this.page = this.page + 1;
      sessionStorage['page'] = this.page;
      this.webService.getBudgetsPage(this.page).subscribe((response) => {
        this.budget_list = response;
      });
    }
  }

  /**
   * Track function for ngFor to optimize rendering performance
   * @param index The index of the item in the array
   * @param item The budget item being tracked
   * @returns The unique identifier for the budget item
   */
  trackByFn(index: number, item: any): any {
    return item._id?.$oid || index;
  }
}

