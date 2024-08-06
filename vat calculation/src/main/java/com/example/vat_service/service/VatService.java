package com.example.vat_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vat_service.model.VatCalculation;
import com.example.vat_service.repository.VatCalculationRepository;

@Service
public class VatService {

    @Autowired
    private VatCalculationRepository vatCalculationRepository;

    public VatCalculation calculateVat(double amount, double vatRate) {
        VatCalculation vatCalculation = new VatCalculation();
        vatCalculation.setAmount(amount);
        vatCalculation.setVatRate(vatRate);

        double vatAmount = amount * vatRate / 100;
        vatCalculation.setVatAmount(vatAmount);
        vatCalculation.setTotalAmount(amount + vatAmount);

        return vatCalculationRepository.save(vatCalculation);
    }
}