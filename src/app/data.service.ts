import jsonData from '../assets/budgets.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageSize: number = 3;

  /**
   * The constructor for the Data Service
   * @param http Injecting the HttpClient to the DataService class
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetch a page of budgets from the local JSON data
   * @param page The page number requested
   * @returns An array of budget objects for the requested page
   */
  getBudgets(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }

  /**
   * Calculate the total number of pages available
   * @returns The total number of pages
   */
  getLastPageNumber() {
    return Math.ceil(jsonData.length / this.pageSize);
  }

  /**
   * Fetch a specific budget by ID from the local JSON data
   * @param id The budget ID to search for
   * @returns An array containing the matching budget object
   */
  getBudget(id: any) {
    let dataToReturn: any[] = [];
    jsonData.forEach(function (budget) {
      if (budget['_id']['$oid'] == id) {
        dataToReturn.push(budget);
      }
    });
    return dataToReturn;
  }

  /**
   * Fetch Lorem Ipsum text from the API Ninjas service
   * @param paragraphs The number of paragraphs to fetch
   * @returns An Observable for the Lorem Ipsum text
   */
  getLoremIpsum(paragraphs: number): Observable<any> {
    let API_key = 'MbJTYZVSdxgZBv3JoSLXZA==64dtY35KCzqWJm9Q';
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/loremipsum?paragraphs=' + paragraphs,
      { headers: { 'X-Api-Key': API_key } }
    );
  }

  /**
   * Fetch current weather data for a specific location
   * @param lat The latitude coordinate
   * @param lon The longitude coordinate
   * @returns An Observable for the weather data
   */
  getCurrentWeather(lat: number, lon: number) {
    let API_key = 'af243c3d35c6f4fa444bd0594f3f09f6';
    return this.http.get<any>(
      'https://api.openweathermap.org/data/2.5/weather?lat=' +
        lat +
        '&lon=' +
        lon +
        '&units=metric&appid=' +
        API_key
    );
  }

  /**
   * Get the color representation for a temperature value
   * @param temp The temperature in Celsius
   * @returns A hex color code based on the temperature
   */
  getTemperatureColour(temp: number) {
    if (temp <= 5) return '#0000ff';
    else if (temp <= 12) return '#00ff00';
    else if (temp <= 17) return '#ffff00';
    else if (temp <= 25) return '#ff7f00';
    else return '#ff0000';
  }

  populateReviews() {
    let loremIpsum = '';
    this.getLoremIpsum(1).subscribe((response: any) => {
      loremIpsum = response.text;

      jsonData.forEach((budget: any) => {
        if (!budget.reviews) {
          budget.reviews = [];
        }
        let numReviews = Math.floor(Math.random() * 10);
        for (let i = 0; i < numReviews; i++) {
          let textSize = Math.floor(Math.random() * 290 + 10);
          let textStart = Math.floor(
            Math.random() * (loremIpsum.length - textSize)
          );
          let dummyReview = {
            username: 'User ' + Math.floor(Math.random() * 9999 + 1),
            comment: loremIpsum.slice(textStart, textStart + textSize),
            stars: Math.floor(Math.random() * 5) + 1,
          };
          budget.reviews.push(dummyReview);
        }
      });
    });
  }

  /**
   * Post a new review to the local JSON data
   * @param id The budget ID to add the review to
   * @param review The review object containing username, comment, and stars
   */
  postReview(id: any, review: any) {
    let newReview = {
    'username' : review.username,
    'comment' : review.comment,
    'stars' : review.stars
    };
    jsonData.forEach( function(budget) {
      if ( budget['_id']['$oid'] == id )
        budget['reviews'].push(  );
    });
 }
}
