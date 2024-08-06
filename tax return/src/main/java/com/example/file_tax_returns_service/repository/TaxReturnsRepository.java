package com.example.file_tax_returns_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.file_tax_returns_service.model.TaxReturns;

public interface TaxReturnsRepository extends JpaRepository<TaxReturns, Long> {
    
}
