package com.loan.management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
//@EnableJpaRepositories(basePackages = "com.example.loanmanagement.loanmanagement_repo")
public class LoanmanagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(LoanmanagementApplication.class, args);
	}

}
