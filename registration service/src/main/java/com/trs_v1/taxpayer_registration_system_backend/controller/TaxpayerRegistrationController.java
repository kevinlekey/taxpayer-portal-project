package com.trs_v1.taxpayer_registration_system_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trs_v1.taxpayer_registration_system_backend.model.Taxpayers;
import com.trs_v1.taxpayer_registration_system_backend.service.TaxpayerRegistrationService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/taxpayers")
@Validated
@CrossOrigin(origins = "http://localhost:3000")
public class TaxpayerRegistrationController {

    @Autowired
    private TaxpayerRegistrationService registrationService;

    @PostMapping("/register")
    public ResponseEntity<?> registerTaxpayer(@Validated @RequestBody Taxpayers taxpayers) {        
        try {
            Taxpayers registeredtaxpayer = registrationService.registerTaxpayer(taxpayers);
            return ResponseEntity.ok(registeredtaxpayer);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }    
}
