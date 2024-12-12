import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  name: string = ''; // Input from the user
  eligibilityStatus: string = ''; // Response from the backend

  constructor(private customerService: CustomerService) {}

  checkEligibility() {
    if (this.name.trim()) {
      this.customerService.getEligibilityStatus(this.name).subscribe(
        (response) => {
          this.eligibilityStatus = response; // Update the response
        },
        (error) => {
          console.error('Error fetching eligibility status:', error);
          this.eligibilityStatus = 'Error fetching eligibility status!';
        }
      );
    } else {
      this.eligibilityStatus = 'Please enter a valid name.';
    }
  }
}