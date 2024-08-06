package com.example.driving_license_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.driving_license_service.model.DrivingLicense;
import com.example.driving_license_service.service.DrivingLicenseService;

import java.util.List;

@RestController
@RequestMapping("/api/driving-licenses")
@CrossOrigin(origins = "http://localhost:3000")
public class DrivingLicenseController {

    @Autowired
    private DrivingLicenseService drivingLicenseService;

    @GetMapping
    public List<DrivingLicense> getAllDrivingLicenses() {
        return drivingLicenseService.getAllDrivingLicenses();
    }

    @GetMapping("/{id}")
    public DrivingLicense getDrivingLicenseById(@PathVariable Long id) {
        return drivingLicenseService.getDrivingLicenseById(id);
    }

    @PostMapping
    public DrivingLicense createDrivingLicense(@RequestBody DrivingLicense drivingLicense) {
        return drivingLicenseService.saveDrivingLicense(drivingLicense);
    }

    @DeleteMapping("/{id}")
    public void deleteDrivingLicense(@PathVariable Long id) {
        drivingLicenseService.deleteDrivingLicense(id);
    }

    @PostMapping("/apply")
    public DrivingLicense applyForDrivingLicense(@RequestBody DrivingLicense drivingLicense) {
        return drivingLicenseService.applyForDrivingLicense(drivingLicense);
    }

    @PutMapping("/extend/{id}")
    public DrivingLicense extendValidity(@PathVariable Long id, @RequestParam int additionalYears) {
        return drivingLicenseService.extendValidity(id, additionalYears);
    }
}