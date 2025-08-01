import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * The Web Service provides access to the endpoints of the
 * Budget Directory API.
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
   * Fetch all budgets from the Budget Directory API
   * @returns An Observable for the collection of all budgets
   */
  getBudgets() {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/allbudgets'
    );
  }

  /**
   * Fetch a page of budgets from the Budget Directory API
   * @param page The page number requested
   * @returns An Observable for the collection of budgets
   */
  getBudgetsPage(page: number) {
    return this.http.get<any[]>(
      'http://localhost:5001/api/v1.0/budgets?pn=' + page + '&ps=' + this.pageSize
    );
  }

  /**
   * Fetch a single budget by ID
   * @param id The budget ID
   * @returns An Observable for the budget object
   */
  getBudget(id: any) {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/budgets/' + id
    );
  }

  /**
   * Fetch reviews for a specific budget
   * @param id The budget ID
   * @returns An Observable for the collection of reviews
   */
  getReviews(id: any) {
    return this.http.get<any>(
      'http://localhost:5001/api/v1.0/budgets/' +
      id + '/reviews'
    );
  }

  /**
   * Post a new review for a budget
   * @param id The budget ID
   * @param review The review object containing username, comment, and stars
   * @returns An Observable for the response
   */
  postReview(id: any, review: any) {
    let postData = new FormData();
    postData.append("username", review.username);
    postData.append("comment", review.comment);
    postData.append("stars", review.stars);
    return this.http.post<any>(
    'http://localhost:5001/api/v1.0/budgets/' +
    id + "/reviews", postData);
  }
}
