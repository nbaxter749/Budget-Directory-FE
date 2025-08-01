import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from './web.service';

@Component({
  selector: 'budget',
  standalone: true,
  imports: [RouterOutlet, CommonModule, GoogleMapsModule, ReactiveFormsModule],
  providers: [DataService, WebService],
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
})
export class BudgetComponent implements OnInit {
  budget_list: any[] = [];
  budget: any;
  budget_lat: any;
  budget_lng: any;
  map_options: google.maps.MapOptions = {};
  map_locations: any[] = [];
  loremIpsum: any;
  temperature: any;
  weather: any;
  weatherIcon: any;
  weatherIconURL: any;
  temperatureColour: any;
  reviewForm: any;
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

  ngOnInit() {
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

  isInvalid(control: any) {
    return (
      this.reviewForm.controls[control].invalid &&
      this.reviewForm.controls[control].touched
    );
  }

  isUntouched() {
    return (
      this.reviewForm.controls.username.pristine ||
      this.reviewForm.controls.comment.pristine
    );
  }

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
