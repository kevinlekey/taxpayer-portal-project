package com.example.report_tax_crime_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.report_tax_crime_service.model.TaxCrimeReport;
import com.example.report_tax_crime_service.repository.TaxCrimeReportRepository;

@Service
public class TaxCrimeReportService {

    @Autowired
    private TaxCrimeReportRepository repository;

    public TaxCrimeReport saveReport(TaxCrimeReport report) {
        return repository.save(report);
    }

    public List<TaxCrimeReport> getAllReports() {
        return repository.findAll();
    }

    public TaxCrimeReport getReportById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteReport(Long id) {
        repository.deleteById(id);
    }
}
