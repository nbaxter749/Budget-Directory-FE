import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebService } from './web.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

/**
 * The Grid Component displays budget data in an AG Grid format
 * with advanced features like sorting, filtering, and pagination.
 */
@Component({
  selector: 'grid',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular],
  providers: [WebService],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {

  /**
   * Column definitions for the AG Grid
   */
  headings: ColDef[] = [
    { field: "username", headerName: "Username", filter: true, floatingFilter: true },
    { field: "town", headerName: "Town", filter: true },
    { field: "monthly_income", headerName: "Monthly Income", filter: true },
    { valueGetter: "data.savings.current", headerName: "Current Savings" },
    { valueGetter: "data.savings.goal", headerName: "Savings Goal" },
    { valueGetter: "data.savings.progress", headerName: "Progress %" }
  ];

  /**
   * Array containing the budget data for the grid
   */
  data: any = [];

  /**
   * Enable pagination for the grid
   */
  pagination = true;

  /**
   * Number of items to display per page
   */
  paginationPageSize = 10;

  /**
   * Available page size options for the user to select
   */
  paginationPageSizeSelector = [10, 25, 50];

  /**
   * Disable automatic page size calculation
   */
  paginationAutoPageSize = false;

  /**
   * The constructor for the Grid Component
   * @param webService Injecting the WebService for API calls
   */
  constructor(private webService: WebService) { }

  /**
   * Initialize the component by loading budget data from the API
   */
  ngOnInit() {
    this.webService.getBudgets()
      .subscribe((response) => {
        this.data = response;
      });
  }
} 