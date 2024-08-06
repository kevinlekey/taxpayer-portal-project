package com.example.report_tax_crime_service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.report_tax_crime_service.model.TaxCrimeReport;
import com.example.report_tax_crime_service.service.TaxCrimeReportService;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:3000")
public class TaxCrimeReportController {

    @Autowired
    private TaxCrimeReportService service;

    @PostMapping
    public TaxCrimeReport createReport(@RequestBody TaxCrimeReport report) {
        return service.saveReport(report);
    }

    @GetMapping
    public List<TaxCrimeReport> getAllReports() {
        return service.getAllReports();
    }

    @GetMapping("/{id}")
    public TaxCrimeReport getReportById(@PathVariable Long id) {
        return service.getReportById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable Long id) {
        service.deleteReport(id);
    }
}
