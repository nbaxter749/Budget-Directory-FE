import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; // Import map operator from RxJS

@Injectable()
export class WebService {

  pageSize: number = 3;

  constructor(private http: HttpClient) {}

  getBusinesses(page: number) {
    return this.http.get<any[]>(
      'http://localhost:5001/api/v1.0/businesses?pn=' + page + '&ps=' + this.pageSize
    ).pipe(
      map((businesses) =>
        businesses.map((business) => ({
          ...business,
          reviews: business.reviews || [], // Ensure reviews is always an array
        }))
      )
    );
  }
}
