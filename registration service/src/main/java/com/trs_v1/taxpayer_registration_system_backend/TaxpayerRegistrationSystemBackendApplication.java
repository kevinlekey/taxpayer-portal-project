package com.trs_v1.taxpayer_registration_system_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAutoConfiguration
@EnableTransactionManagement
public class TaxpayerRegistrationSystemBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(TaxpayerRegistrationSystemBackendApplication.class, args);
	}

}
