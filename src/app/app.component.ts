import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BusinessesComponent } from './businesses.component';
import { NavComponent } from './nav.component'
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { WebService } from './web.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BusinessesComponent, NavComponent, CommonModule],
  providers: [DataService, WebService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'My bizFE';

  constructor(private webService: WebService) { }
}
