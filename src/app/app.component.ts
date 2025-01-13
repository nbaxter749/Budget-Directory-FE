import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessesComponent } from './businesses.component';
import { NavComponent } from './nav.component'
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BusinessesComponent, NavComponent, CommonModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'My bizFE';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.populateReviews();
}
}
