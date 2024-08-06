package com.trs_v1.taxpayer_registration_system_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.trs_v1.taxpayer_registration_system_backend.model.TINApplication;
import com.trs_v1.taxpayer_registration_system_backend.model.TINRecord;
import com.trs_v1.taxpayer_registration_system_backend.service.TINApplicationService;
import com.trs_v1.taxpayer_registration_system_backend.model.ErrorResponse;
import com.trs_v1.taxpayer_registration_system_backend.repository.TINRecordRepository;
import com.trs_v1.taxpayer_registration_system_backend.model.TINResponse;

@RestController
@RequestMapping("/api/tin-applications")
@CrossOrigin(origins = "http://localhost:3000")
public class TINApplicationController {

    @Autowired
    private TINApplicationService tinApplicationService;

    @Autowired
    private TINRecordRepository tinRecordRepository;

    @PostMapping("/submit")
    public ResponseEntity<?> submitApplication(@RequestBody TINApplication application) {
        try {
            TINApplication savedApplication = tinApplicationService.submitApplication(application);
            return ResponseEntity.ok(savedApplication);
        } catch (TINApplicationService.ValidationException e) {
            
            return ResponseEntity.badRequest().body(new ErrorResponse("Invalid input", String.join(", ", e.getErrors())));
        } catch (Exception e) {
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body(new ErrorResponse("Server error", "An unexpected error occurred"));
        }
    }

    @GetMapping("/status")
    public ResponseEntity<String> checkApplicationStatus(@RequestParam String fullName, @RequestParam String nin) {
        String status = tinApplicationService.checkApplicationStatus(fullName, nin);
        return ResponseEntity.ok(status);
    }
    
    @PostMapping("/approve")
    public ResponseEntity<TINApplication> approveApplication(@RequestParam String fullName, @RequestParam String nin) {
        try {
            TINApplication approvedApplication = tinApplicationService.approveApplication(fullName, nin);
            return ResponseEntity.ok(approvedApplication);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @GetMapping("/find-tin")
public ResponseEntity<?> findTIN(@RequestParam String fullName, @RequestParam String nin) {
    try {
        List<TINApplication> applications = tinApplicationService.findByFullNameAndNin(fullName, nin);
        
        if (applications.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Not Found", "Application not found for the provided details"));
        }

        TINApplication application = applications.get(0);
        
        Optional<TINRecord> tinRecordOptional = tinRecordRepository.findByApplication(application);
        
        if (tinRecordOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse("Not Found", "TIN not found for the provided details"));
        }
        
        String tin = tinRecordOptional.get().getTin();
        return ResponseEntity.ok(new TINResponse(tin));
        
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ErrorResponse("Server error", "An unexpected error occurred"));
    }
}

}