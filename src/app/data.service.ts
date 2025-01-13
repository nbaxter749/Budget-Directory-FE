import jsonData from '../assets/businesses.json';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  pageSize: number = 3;

  constructor(private http: HttpClient) {}

  getBusinesses(page: number) {
    let pageStart = (page - 1) * this.pageSize;
    let pageEnd = pageStart + this.pageSize;
    return jsonData.slice(pageStart, pageEnd);
  }

  getLastPageNumber() {
    return Math.ceil(jsonData.length / this.pageSize);
  }

  getBusiness(id: any) {
    let dataToReturn: any[] = [];
    jsonData.forEach(function (business) {
      if (business['_id']['$oid'] == id) {
        dataToReturn.push(business);
      }
    });
    return dataToReturn;
  }

  getLoremIpsum(paragraphs: number): Observable<any> {
    let API_key = 'MbJTYZVSdxgZBv3JoSLXZA==64dtY35KCzqWJm9Q';
    return this.http.get<any>(
      'https://api.api-ninjas.com/v1/loremipsum?paragraphs=' + paragraphs,
      { headers: { 'X-Api-Key': API_key } }
    );
  }

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

      jsonData.forEach((business: any) => {
        if (!business.reviews) {
          business.reviews = [];
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
          business.reviews.push(dummyReview);
        }
      });
    });
  }

  postReview(id: any, review: any) {
    let newReview = {
    'username' : review.username,
    'comment' : review.comment,
    'stars' : review.stars
    };
    jsonData.forEach( function(business) {
      if ( business['_id']['$oid'] == id )
        business['reviews'].push(  );
    });
 }


}
