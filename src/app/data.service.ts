import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getBudgets(page: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5001/api/v1.0/budgets?pn=${page}&ps=4`);
  }

  getBudget(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5001/api/v1.0/budgets/${id}`);
  }

  getReviews(id: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:5001/api/v1.0/budgets/${id}/reviews`);
  }

  postReview(id: string, review: any): Observable<any> {
    const formData = new FormData();
    formData.append('username', review.username);
    formData.append('comment', review.comment);
    formData.append('stars', review.stars.toString());
    return this.http.post<any>(`http://localhost:5001/api/v1.0/budgets/${id}/reviews`, formData);
  }

  getLastPageNumber(): number {
    return 10; // Default page count
  }
}
