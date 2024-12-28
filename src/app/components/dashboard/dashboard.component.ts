import { Component } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  name: string = '';
  creditScore: number = 700;
  yearlyIncome: number = 50000;
  totalDebt: number = 5000;
  employmentStatus: string = 'Employed';

  eligibilityStatus: string = '';
  rejectionReasons: string[] = [];
  message: string = '';
  loanAmount: number = 0;

  isLoading: boolean = false;

  constructor(private customerService: CustomerService) {}

  checkEligibility() {
    if (this.name.trim()) {
      this.isLoading = true;
      this.customerService
        .getEligibilityStatus(
          this.name,
          this.creditScore,
          this.yearlyIncome,
          this.totalDebt,
          this.employmentStatus
        )
        .subscribe(
          (response: string) => {
            this.eligibilityStatus = response;
            this.rejectionReasons = [];
            this.message = '';
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching eligibility status:', error);
            this.eligibilityStatus = 'Error fetching eligibility status!';
            this.rejectionReasons = [];
            this.message = '';
            this.isLoading = false;
          }
        );

      this.calculateLoanAmount();
    } else {
      this.eligibilityStatus = 'Please enter a valid name.';
      this.rejectionReasons = [];
      this.message = '';
      this.loanAmount = 0;
    }
  }

  calculateLoanAmount() {
    this.isLoading = true;
    this.customerService
      .calculateMaxLoanAmount(this.creditScore, this.yearlyIncome, this.totalDebt)
      .subscribe(
        (response: { maxLoanAmount: number }) => {
          this.loanAmount = response.maxLoanAmount;
          this.isLoading = false;
        },
        (error) => {
          console.error('Error calculating max loan amount:', error);
          this.loanAmount = 0;
          this.isLoading = false;
        }
      );
  }
}
