package com.example.vat_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.vat_service.model.VatCalculation;
import com.example.vat_service.service.VatService;

@RestController
@RequestMapping("/api/vat")
@CrossOrigin(origins = "http://localhost:3000")
public class VatController {

    @Autowired
    private VatService vatService;

    @GetMapping("/calculate-vat")
    public VatCalculation calculateVat(@RequestParam double amount, @RequestParam double vatRate) {
        return vatService.calculateVat(amount, vatRate);
    }
}
