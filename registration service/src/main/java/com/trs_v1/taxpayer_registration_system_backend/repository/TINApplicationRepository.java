package com.trs_v1.taxpayer_registration_system_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.trs_v1.taxpayer_registration_system_backend.model.TINApplication;

public interface TINApplicationRepository extends JpaRepository<TINApplication, Long> {
    List<TINApplication> findByFullNameAndNin(String fullName, String nin);
}
