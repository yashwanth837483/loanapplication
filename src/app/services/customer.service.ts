import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getEligibilityStatusByName(name: string): Observable<{ status: string }> {
    const url = `${this.apiUrl}/cusname?name=${name}`;
    return this.http.get<{ status: string }>(url).pipe(
      catchError(this.handleError)
    );
  }

  getLoanApplicationById(id: number): Observable<any> {
    const url = `${this.apiUrl}/loan-application/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  getEligibilityStatus(
    name: string,
    creditScore: number,
    yearlyIncome: number,
    totalDebt: number,
    employmentStatus: string
  ): Observable<string> {
    const url = `${this.apiUrl}/loan-application/check-eligibility?name=${name}&creditScore=${creditScore}&yearlyIncome=${yearlyIncome}&totalDebt=${totalDebt}&employmentStatus=${employmentStatus}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      catchError(this.handleError)
    );
  }

  calculateMaxLoanAmount(
    creditScore: number,
    yearlyIncome: number,
    totalDebt: number
  ): Observable<{ maxLoanAmount: number }> {
    const url = `${this.apiUrl}/loan-application/loan-calculator?creditScore=${creditScore}&yearlyIncome=${yearlyIncome}&totalDebt=${totalDebt}`;
    return this.http.get<{ maxLoanAmount: number }>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Error occurred:', error);
    return throwError('Error occurred! Please try again later.');
  }
}
