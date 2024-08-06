package com.example.vfd_efd_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.vfd_efd_service.model.FiscalReceipt;

@Repository
public interface FiscalReceiptRepository extends JpaRepository<FiscalReceipt, Long> {
}
