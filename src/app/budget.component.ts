import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebService } from './web.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'budget',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, GoogleMapsModule],
  providers: [WebService],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budget: any = {};
  reviews: any = [];
  newReview: any = { username: '', comment: '', stars: 5 };
  
  // Google Maps properties
  center: google.maps.LatLngLiteral = { lat: 54.5, lng: -6.5 };
  zoom = 8;
  markerPosition: google.maps.LatLngLiteral | null = null;

  constructor(
    private route: ActivatedRoute, 
    private webService: WebService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const budgetId = params['id'];
      this.loadBudget(budgetId);
      this.loadReviews(budgetId);
    });
  }

  loadBudget(budgetId: string) {
    this.webService.getBudget(budgetId).subscribe((response) => {
      this.budget = response;
      this.updateMapLocation();
    });
  }

  loadReviews(budgetId: string) {
    this.webService.getReviews(budgetId).subscribe((response) => {
      this.reviews = response;
    });
  }

  submitReview() {
    const budgetId = this.route.snapshot.params['id'];
    this.webService.postReview(budgetId, this.newReview).subscribe(() => {
      this.loadReviews(budgetId);
      this.newReview = { username: '', comment: '', stars: 5 };
    });
  }

  updateMapLocation() {
    if (this.budget.location && this.budget.location.coordinates) {
      const [lat, lng] = this.budget.location.coordinates; // Correct order: [latitude, longitude]
      this.center = { lat, lng };
      this.markerPosition = { lat, lng };
      this.zoom = 12;
    }
  }
}
