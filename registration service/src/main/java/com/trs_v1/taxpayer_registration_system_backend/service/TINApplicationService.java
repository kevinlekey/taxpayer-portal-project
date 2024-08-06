package com.trs_v1.taxpayer_registration_system_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trs_v1.taxpayer_registration_system_backend.model.TINApplication;
import com.trs_v1.taxpayer_registration_system_backend.model.TINRecord;
import com.trs_v1.taxpayer_registration_system_backend.repository.TINApplicationRepository;
import com.trs_v1.taxpayer_registration_system_backend.repository.TINRecordRepository;

import java.util.logging.Logger;

@Service
@Transactional
public class TINApplicationService {
    private static final Logger LOGGER = Logger.getLogger(TINApplicationService.class.getName());

    @Autowired
    private TINApplicationRepository applicationRepository;

    @Autowired
    private TINRecordRepository tinRecordRepository;
    
    public TINApplication submitApplication(TINApplication application) {
        List<String> errors = validateApplication(application);
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }

        TINApplication savedApplication = applicationRepository.save(application);

        TINApplication approvedApplication = approveApplication(savedApplication.getFullName(), savedApplication.getNin());

        return approvedApplication;
    }

    public String checkApplicationStatus(String fullName, String nin) {
        List<TINApplication> applications = applicationRepository.findByFullNameAndNin(fullName, nin);
        
        if (applications.isEmpty()) {
            return "Application not found";
        } else if (applications.size() > 1) {
            throw new RuntimeException("Multiple applications found for fullName: " + fullName + " and nin: " + nin);
        } else {

            return applications.get(0).getStatus().toString();
        }
    }
    

    public TINApplication approveApplication(String fullName, String nin) {
        List<TINApplication> applications = applicationRepository.findByFullNameAndNin(fullName, nin);
    
        if (applications.isEmpty()) {
            throw new IllegalArgumentException("Application not found");
        }
    
        if (applications.size() > 1) {
            LOGGER.warning("Multiple applications found for fullName: " + fullName + " and nin: " + nin + ". Unable to approve.");
            return null;
        }
        
        TINApplication application = applications.get(0);
        application.setStatus(TINApplication.ApplicationStatus.APPROVED);
        TINApplication savedApplication = applicationRepository.save(application);

        String generatedTIN = generateTIN();

        TINRecord tinRecord = new TINRecord();
        tinRecord.setApplication(savedApplication);
        tinRecord.setTin(generatedTIN);
        tinRecordRepository.save(tinRecord);

        return savedApplication;
    }

    public List<String> validateApplication(TINApplication application) {
        List<String> errors = new ArrayList<>();

        if (application.getApplicationType() == null) {
            errors.add("Application type is required");
        }

        if (application.getFullName() == null || application.getFullName().isEmpty()) {
            errors.add("Full name is required");
        }

        if (application.getNin() == null || application.getNin().isEmpty()) {
            errors.add("NIN is required");
        }

        if (application.getEmail() == null || application.getEmail().isEmpty()) {
            errors.add("Email is required");
        }

        if (application.getApplicationType() == TINApplication.ApplicationType.ENTITY) {
            if (application.getBusinessName() == null || application.getBusinessName().isEmpty()) {
                errors.add("Business name is required for entity applications");
            }
            if (application.getBusinessAddress() == null || application.getBusinessAddress().isEmpty()){
                errors.add("Business address is required for eitity");
            }
        }

        return errors;
    }

    private String generateTIN() {
        Random random = new Random();
        StringBuilder tinBuilder = new StringBuilder("TIN");
        for (int i = 0; i < 9; i++) {
            int digit = random.nextInt(10);
            tinBuilder.append(digit);
        }
        return tinBuilder.toString();
    }

    public String findTINByFullNameAndNin(String fullName, String nin) {
        List<TINApplication> applications = applicationRepository.findByFullNameAndNin(fullName, nin);
        if (applications.isEmpty()) {
            return null;
        }
        TINApplication application = applications.get(0);
        Optional<TINRecord> tinRecordOptional = tinRecordRepository.findByApplication(application);
        return tinRecordOptional.map(TINRecord::getTin).orElse(null);
    }
    
    public static class ValidationException extends RuntimeException {
        private List<String> errors;

        public ValidationException(List<String> errors) {
            super("Validation failed");
            this.errors = errors;
        }

        public List<String> getErrors() {
            return errors;
        }
    }

    public List<TINApplication> findByFullNameAndNin(String fullName, String nin) {
        return applicationRepository.findByFullNameAndNin(fullName, nin);
    }
}