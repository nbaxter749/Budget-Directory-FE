import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { DataService } from './data.service';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';

/**
 * The Budgets Component displays a paginated list of budget cards
 * with navigation controls for browsing through the budget directory.
 */
@Component({
  selector: 'budgets',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  providers: [DataService, WebService],
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css'],
})
export class BudgetsComponent {
  /**
   * Array containing the list of budgets for the current page
   */
  budget_list: any = [];

  /**
   * The current page number being displayed
   */
  page: number = 1;

  /**
   * The constructor for the Budgets Component
   * @param dataService Injecting the DataService for pagination calculations
   * @param webService Injecting the WebService for API calls
   */
  constructor(public dataService: DataService, private webService: WebService) {}

  /**
   * Initialize the component by loading the first page of budgets
   * and restoring the page number from session storage if available
   */
  ngOnInit() {
    if (sessionStorage['page']) {
      this.page = Number(sessionStorage['page']);
    }
    this.webService.getBudgetsPage(this.page).subscribe((response) => {
      this.budget_list = response;
    });
  }

  /**
   * Navigate to the previous page of budgets
   * Updates the page number and loads the corresponding data
   */
  previousPage() {
    if (this.page > 1) {
      this.page = this.page - 1;
      sessionStorage['page'] = this.page;
      this.webService.getBudgetsPage(this.page).subscribe((response) => {
        this.budget_list = response;
      });
    }
  }

  /**
   * Navigate to the next page of budgets
   * Updates the page number and loads the corresponding data
   */
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

