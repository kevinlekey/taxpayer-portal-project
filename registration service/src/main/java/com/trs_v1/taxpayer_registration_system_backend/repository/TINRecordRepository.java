package com.trs_v1.taxpayer_registration_system_backend.repository;

import com.trs_v1.taxpayer_registration_system_backend.model.TINApplication;
import com.trs_v1.taxpayer_registration_system_backend.model.TINRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TINRecordRepository extends JpaRepository<TINRecord, Long> {
    Optional<TINRecord> findByTin(String tin);
    Optional<TINRecord> findByApplication(TINApplication application);   
}