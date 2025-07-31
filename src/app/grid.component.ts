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
    { field: "name", headerName: "Name", filter: true, floatingFilter: true },
    { field: "town", headerName: "Town", filter: true },
    { field: "rating", headerName: "Rating", filter: true },
    { field: "num_employees", headerName: "Workforce" },
    { valueGetter: "data.profit[0].gross", headerName: "2022" },
    { valueGetter: "data.profit[1].gross", headerName: "2023" },
    { valueGetter: "data.profit[2].gross", headerName: "2024" }
  ];

  data: any = [];

  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 25, 50];
  paginationAutoPageSize = false;

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.webService.getBusinesses()
      .subscribe((response) => {
        this.data = response;
      });
  }
} 