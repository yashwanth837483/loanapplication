import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EligibilityResponse } from './eligibility-response.model';  // Ensure correct path
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/cusname'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to fetch eligibility status
  getEligibilityStatus(customerName: string): Observable<string> {
    return this.http.get<EligibilityResponse>(`${this.apiUrl}?name=${customerName}`).pipe(
      map((response) => {
        if (response && response.status) {
          return response.status;  // Extract the 'status' field from the response
        } else {
          throw new Error('Invalid response format');  // Handle unexpected format
        }
      }),
      catchError(this.handleError)  // Improved error handling
    );
  }

  // Custom error handler
  private handleError(error: any) {
    // Print the error for debugging purposes
    console.error('Error occurred:', error);

    // Return a user-friendly error message
    return throwError('Error fetching eligibility status! Please try again later.');
  }
}
