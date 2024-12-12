import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:8080/cusname'; // Base API URL

  constructor(private http: HttpClient) {}

  getEligibilityStatus(name: string): Observable<string> {
    const params = new HttpParams().set('name', name); // Add query parameter
    return this.http.get(this.apiUrl, { params, responseType: 'text' }); // Expecting plain text response
  }
}
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CustomerService {

//   constructor() { }
// }
