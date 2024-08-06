package com.example.driving_license_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.driving_license_service.model.DrivingLicense;

public interface DrivingLicenseRepository extends JpaRepository<DrivingLicense, Long> {

}
