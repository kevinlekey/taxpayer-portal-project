package com.example.driving_license_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.driving_license_service.model.DrivingLicense;
import com.example.driving_license_service.repository.DrivingLicenseRepository;

import java.time.LocalDate;
import java.util.List;


@Service
public class DrivingLicenseService {
    @Autowired
    private DrivingLicenseRepository drivingLicenseRepository;

    public List<DrivingLicense> getAllDrivingLicenses() {
        return drivingLicenseRepository.findAll();
    }

    public DrivingLicense getDrivingLicenseById(Long id) {
        return drivingLicenseRepository.findById(id).orElse(null);
    }

    public DrivingLicense saveDrivingLicense(DrivingLicense drivingLicense) {
        return drivingLicenseRepository.save(drivingLicense);
    }

    public void deleteDrivingLicense(Long id) {
        drivingLicenseRepository.deleteById(id);
    }

    public DrivingLicense applyForDrivingLicense(DrivingLicense drivingLicense) {
        drivingLicense.setIssueDate(LocalDate.now());
        drivingLicense.setExpiryDate(LocalDate.now().plusYears(5)); // Set validity for 5 years
        return drivingLicenseRepository.save(drivingLicense);
    }

    public DrivingLicense extendValidity(Long id, int additionalYears) {
        DrivingLicense license = getDrivingLicenseById(id);
        if (license != null) {
            LocalDate newExpiryDate = license.getExpiryDate().plusYears(additionalYears);
            license.setExpiryDate(newExpiryDate);
            return drivingLicenseRepository.save(license);
        }
        throw new RuntimeException("Driving License not found");
    }    
}