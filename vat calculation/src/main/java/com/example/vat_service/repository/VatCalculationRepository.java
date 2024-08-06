package com.example.vat_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vat_service.model.VatCalculation;

@Repository
public interface VatCalculationRepository extends JpaRepository<VatCalculation, Long> {
}