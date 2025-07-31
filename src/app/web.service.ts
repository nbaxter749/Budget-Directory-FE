import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * The Web Service provides access to the endpoints of the
 * Biz Directory API.
 */
@Injectable()
export class WebService {

  /**
   * The default page size to be returned
   */
  pageSize: number = 4;

  /**
   * The constructor for the Web Service
   * @param http Injecting the HttpClient to the WebService class
   */
  constructor(private http: HttpClient) {}

  /**
   * Fetch all businesses from the Biz Directory API
   * @returns An Observable for the collection of all businesses
   */
  getBusinesses() {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/allbusinesses'
    );
  }

  /**
   * Fetch a page of businesses from the Biz Directory API
   * @param page The page number requested
   * @returns An Observable for the collection of businesses
   */
  getBusinessesPage(page: number) {
    return this.http.get<any[]>(
      'http://localhost:5001/api/v1.0/businesses?pn=' + page + '&ps=' + this.pageSize
    );
  }

  /**
   * Fetch a single business by ID
   * @param id The business ID
   * @returns An Observable for the business object
   */
  getBusiness(id: any) {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/businesses/' + id
    );
  }

  /**
   * Fetch reviews for a specific business
   * @param id The business ID
   * @returns An Observable for the collection of reviews
   */
  getReviews(id: any) {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/businesses/' +
      id + '/reviews'
    );
  }

  /**
   * Post a new review for a business
   * @param id The business ID
   * @param review The review object containing username, comment, and stars
   * @returns An Observable for the response
   */
  postReview(id: any, review: any) {
    let postData = new FormData();
    postData.append("username", review.username);
    postData.append("comment", review.comment);
    postData.append("stars", review.stars);
    return this.http.post<any>(
    'http://localhost:5001/api/v1.0/businesses/' +
    id + "/reviews", postData);
  }
}
