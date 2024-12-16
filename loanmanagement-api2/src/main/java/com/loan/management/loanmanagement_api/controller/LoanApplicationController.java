package com.loan.management.loanmanagement_api.controller;

import java.util.HashMap;
import java.util.Map; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.loan.management.service.LoanApplicationService;

@RestController
@CrossOrigin("http://localhost:4200")
public class LoanApplicationController {

	private final LoanApplicationService loanApplicationService;

	public LoanApplicationController(LoanApplicationService loanApplicationService) {
		this.loanApplicationService = loanApplicationService;
	}

	/*
	 * @GetMapping("/cusname") public String getStatus(@RequestParam String name) {
	 * return loanApplicationService.getEligibilityStatus(name); }
	 */
	@GetMapping("/cusname")
	public ResponseEntity<Map<String, String>> getEligibilityStatus(@RequestParam String name) {
	    String eligibility = loanApplicationService.getEligibilityStatus(name);
	    Map<String, String> response = new HashMap<>();
	    response.put("status", eligibility); // Example: "Eligible" or error message

	    return ResponseEntity.ok(response);  // Return a valid JSON object
	}

}