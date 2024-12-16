package com.loan.management.service;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loan.management.loanmanagement_entity.LoanApplicationEntity;
import com.loan.management.loanmanagement_entity.LoanEligibilityConfig;
import com.loan.management.loanmanagement_repo.LoanApplicationRepo;
import com.loan.management.loanmanagement_repo.LoanEligibilityConfigRepo;

@Service
public class LoanApplicationServiceImpl implements LoanApplicationService {

	private final LoanApplicationRepo loanApplicationRepository;
	private final LoanEligibilityConfigRepo loanEligibilityConfigRepo;

	@Autowired
	public LoanApplicationServiceImpl(LoanApplicationRepo loanApplicationRepository,
			LoanEligibilityConfigRepo loanEligibilityConfigRepo) {
		this.loanApplicationRepository = loanApplicationRepository;
		this.loanEligibilityConfigRepo = loanEligibilityConfigRepo;
	}

	@Override
	public String getEligibilityStatus(String customerName) {
		LoanApplicationEntity loanApplication = loanApplicationRepository.findByCustomerName(customerName);

		if (loanApplication == null) {
			return "No loan application found for customer: " + customerName;
		}
	

		// Fetch configuration from the database
		LoanEligibilityConfig config = loanEligibilityConfigRepo.findById(1L)
				.orElseThrow(() -> new RuntimeException("Configuration not found"));

		// Check eligibility using dynamic credit score and income thresholds
		if (loanApplication.getCreditScore() < config.getCreditScoreThreshold()) {
			return "Customer " + customerName + " is not eligible due to low credit score.";
		}

		if (loanApplication.getIncome().compareTo(new BigDecimal(config.getIncomeThreshold())) < 0) {
			return "Customer " + customerName + " is not eligible due to low income.";
		}

		// Further checks can be added based on your eligibility criteria
		loanApplication.setEligibilityStatus("Eligible");
		return "Customer " + customerName + " is eligible for the loan.";
	}
}
