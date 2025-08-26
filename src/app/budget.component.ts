import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from './web.service';
import { environment } from '../environments/environment';

/**
 * The Budget Component displays detailed information about a specific budget
 * including location data, weather information, and user reviews.
 */
@Component({
  selector: 'budget',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GoogleMapsModule, ReactiveFormsModule],
  providers: [DataService, WebService],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  /**
   * Array containing the budget data for display
   */
  budget_list: any[] = [];

  /**
   * The current budget object being displayed
   */
  budget: any;

  /**
   * The latitude coordinate for the budget location
   */
  budget_lat: any;

  /**
   * The longitude coordinate for the budget location
   */
  budget_lng: any;

  /**
   * Configuration options for the Google Maps component
   */
  map_options: google.maps.MapOptions = {};

  /**
   * Array of location coordinates for the map markers
   */
  map_locations: any[] = [];

  /**
   * Lorem Ipsum text for the budget description
   */
  loremIpsum: any;

  /**
   * Current temperature value
   */
  temperature: any;

  /**
   * Current weather description
   */
  weather: any;

  /**
   * Weather icon identifier
   */
  weatherIcon: any;

  /**
   * URL for the weather icon image
   */
  weatherIconURL: any;

  /**
   * Color representation of the temperature
   */
  temperatureColour: any;

  /**
   * Form group for the review submission form
   */
  reviewForm: any;

  /**
   * Array containing the reviews for the current budget
   */
  review_list: any;

  /**
   * The constructor for the Budget Component
   * @param dataService Injecting the DataService for external API calls
   * @param route Injecting the ActivatedRoute for getting route parameters
   * @param formBuilder Injecting the FormBuilder for creating reactive forms
   * @param authService Injecting the AuthService for authentication checks
   * @param webService Injecting the WebService for API calls
   */
  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private webService: WebService
  ) {}

  private ensureGoogleMapsLoaded() {
    const existing = document.querySelector('script[data-google-maps-loader]');
    if (existing) return;
    const params = new URLSearchParams({
      key: environment.googleMapsApiKey,
      v: 'weekly'
    });
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?' + params.toString();
    script.setAttribute('data-google-maps-loader', 'true');
    document.head.appendChild(script);
  }

  /**
   * Initialize the component by setting up the review form,
   * loading budget data, and fetching related information
   */
  ngOnInit() {
    this.ensureGoogleMapsLoaded();
    this.reviewForm = this.formBuilder.group({
      username: ['', Validators.required],
      comment: ['', Validators.required],
      stars: 5
    });
    this.webService
      .getBudget(this.route.snapshot.paramMap.get('id'))
      .subscribe((response: any) => {
        this.budget_list = [response];

        this.budget_lat = this.budget_list[0].location.coordinates[0];
        this.budget_lng = this.budget_list[0].location.coordinates[1];

          this.map_locations.push({
            lat: this.budget_lat,
            lng: this.budget_lng,
          });

          this.map_options = {
            mapId: 'DEMO_MAP_ID',
            center: {
              lat: this.budget_lat,
              lng: this.budget_lng,
            },
            zoom: 13,
          };

          this.dataService.getLoremIpsum(1).subscribe((response: any) => {
            this.loremIpsum = response.text.slice(0, 400);
          });

          this.dataService
            .getCurrentWeather(this.budget_lat, this.budget_lng)
            .subscribe((response: any) => {
              const weatherResponse = response['weather'][0]['description'];
              this.temperature = Math.round(response['main']['temp']);
              this.weather =
                weatherResponse[0].toUpperCase() + weatherResponse.slice(1);
              this.weatherIcon = response['weather'][0]['icon'];
              this.weatherIconURL =
                'https://openweathermap.org/img/wn/' + this.weatherIcon + '@4x.png';
              this.temperatureColour = this.dataService.getTemperatureColour(
                this.temperature
              );
            });

        });

        this.webService.getReviews(
          this.route.snapshot.paramMap.get('id'))
          .subscribe( (response) => {
          this.review_list = response;
          });
    }

  /**
   * Submit a new review for the current budget
   * Posts the review data and refreshes the reviews list
   */
  onSubmit() {
    this.webService.postReview(
      this.route.snapshot.paramMap.get('id'),
      this.reviewForm.value)
      .subscribe( (response) => {
      this.reviewForm.reset();

      this.webService.getReviews(
        this.route.snapshot.paramMap.get('id'))
        .subscribe( (response) => {
        this.review_list = response;
        });
        
      });
  }

  /**
   * Check if a form control is invalid and has been touched
   * @param control The name of the form control to check
   * @returns True if the control is invalid and has been touched
   */
  isInvalid(control: any) {
    return (
      this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched
    );
  }

  /**
   * Check if form controls are untouched
   * @returns True if username or comment controls are pristine
   */
  isUntouched() {
    return (
      this.reviewForm.controls.username.pristine ||
      this.reviewForm.controls.comment.pristine
    );
  }

  /**
   * Check if the review form is incomplete
   * @returns True if any required field is invalid or untouched
   */
  isIncomplete() {
    return (
      this.isInvalid('username') ||
      this.isInvalid('comment') ||
      this.isUntouched()
    );
  }

  /**
   * Track function for ngFor to optimize rendering performance
   * @param index The index of the item in the array
   * @param item The review item being tracked
   * @returns The unique identifier for the review item
   */
  trackByFn(index: number, item: any): any {
    return item._id?.$oid || index;
  }
}
