package com.example.file_tax_returns_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.file_tax_returns_service.repository.TaxReturnsRepository;
import com.example.file_tax_returns_service.model.TaxReturns;

@Service
public class TaxReturnsService {

    @Autowired
        private TaxReturnsRepository taxReturnsRepository;

        public List<TaxReturns> getAllTaxReturns() {
            return taxReturnsRepository.findAll();
        }

        public TaxReturns getTaxReturnsById(Long id) {
            return taxReturnsRepository.findById(id).orElse(null);
        }

        public TaxReturns saveTaxReturns(TaxReturns taxReturns) {
            return taxReturnsRepository.save(taxReturns);
        }

        public void deleteTaxReturns(Long id) {
            taxReturnsRepository.deleteById(id);
        }
}
