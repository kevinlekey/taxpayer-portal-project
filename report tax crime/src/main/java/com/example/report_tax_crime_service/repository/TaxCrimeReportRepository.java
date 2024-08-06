package com.example.report_tax_crime_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.report_tax_crime_service.model.TaxCrimeReport;

@Repository
public interface TaxCrimeReportRepository extends JpaRepository<TaxCrimeReport, Long> {
}
