import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebService } from './web.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'grid',
  standalone: true,
  imports: [RouterOutlet, AgGridAngular],
  providers: [WebService],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent implements OnInit {

  headings: ColDef[] = [
    { field: "username", headerName: "Username", filter: true, floatingFilter: true },
    { field: "town", headerName: "Town", filter: true },
    { field: "monthly_income", headerName: "Monthly Income", filter: true },
    { valueGetter: "data.savings.current", headerName: "Current Savings" },
    { valueGetter: "data.savings.goal", headerName: "Savings Goal" },
    { valueGetter: "data.savings.progress", headerName: "Progress %" }
  ];
  data: any = [];

  // Pagination properties
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 25, 50];
  paginationAutoPageSize = false;

  constructor(private webService: WebService) { }

  ngOnInit() {
    this.webService.getBudgets()
      .subscribe((response) => {
        this.data = response;
      });
  }
} 