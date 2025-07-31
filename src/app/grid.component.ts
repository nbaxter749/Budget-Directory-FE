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
    { field: "name" },
    { field: "town" },
    { field: "rating" }
  ];
  data: any = [];

  constructor(private webService: WebService) {}

  ngOnInit() {
    this.webService.getBusinesses()
      .subscribe((response) => {
        this.data = response;
      });
  }
} 