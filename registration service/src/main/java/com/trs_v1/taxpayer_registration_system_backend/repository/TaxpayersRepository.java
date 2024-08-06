package com.trs_v1.taxpayer_registration_system_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trs_v1.taxpayer_registration_system_backend.model.Taxpayers;

public interface TaxpayersRepository extends JpaRepository<Taxpayers, Long> {
    Optional<Taxpayers> findByTin(String Tin);
    boolean existsByTin(String Tin);
    Taxpayers findByTinAndSurname(String tin, String surname);
}
