package com.example.file_tax_returns_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.file_tax_returns_service.service.TaxReturnsService;
import com.example.file_tax_returns_service.model.TaxReturns;

import java.util.List;

@RestController
@RequestMapping("/api/tax-returns")
@CrossOrigin(origins = "http://localhost:3000")
public class TaxReturnsController {
    @Autowired
    private TaxReturnsService taxReturnsService;

    @GetMapping
    public List<TaxReturns> getAllTaxReturns() {
        return taxReturnsService.getAllTaxReturns();
    }

    @GetMapping("/{id}")
    public TaxReturns getTaxReturnsById(@PathVariable Long id) {
        return taxReturnsService.getTaxReturnsById(id);
    }

    @PostMapping
    public TaxReturns createTaxReturns(@RequestBody TaxReturns taxReturns) {
        return taxReturnsService.saveTaxReturns(taxReturns);
    }

    @DeleteMapping("/{id}")
    public void deleteTaxReturns(@PathVariable Long id) {
        taxReturnsService.deleteTaxReturns(id);
    }
}

