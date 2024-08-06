package com.trs_v1.taxpayer_registration_system_backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trs_v1.taxpayer_registration_system_backend.model.TINRecord;
import com.trs_v1.taxpayer_registration_system_backend.model.Taxpayers;
import com.trs_v1.taxpayer_registration_system_backend.repository.TINRecordRepository;
import com.trs_v1.taxpayer_registration_system_backend.repository.TaxpayersRepository;

import com.trs_v1.taxpayer_registration_system_backend.model.TINApplication;

@Service
@Transactional
public class TaxpayerRegistrationService {
    private static final Logger logger = LoggerFactory.getLogger(TaxpayerRegistrationService.class);

    @Autowired
    private TaxpayersRepository taxpayersRepository;

    @Autowired
    private TINRecordRepository tinRecordRepository;

    @Transactional
    public Taxpayers registerTaxpayer(Taxpayers taxpayers) {
        logger.info("Attempting to register taxpayer with TIN: {}", taxpayers.getTin());

        try {
            TINRecord tinRecord = tinRecordRepository.findByTin(taxpayers.getTin())
                .orElseThrow(() -> new RuntimeException("TIN not found or not approved"));

            if (tinRecord.getApplication().getStatus() != TINApplication.ApplicationStatus.APPROVED) {
                throw new RuntimeException("TIN application not approved");
            }

            if (taxpayersRepository.existsByTin(taxpayers.getTin())) {
                throw new RuntimeException("Taxpayer with TIN " + taxpayers.getTin() + " already exists");
            }

            taxpayers.setEmail(tinRecord.getApplication().getEmail());

            Taxpayers savedTaxpayer = taxpayersRepository.save(taxpayers);
            logger.info("Taxpayer registered successfully with TIN: {}", savedTaxpayer.getTin());
            return savedTaxpayer;
        } catch (RuntimeException e) {
            logger.error("Error registering taxpayer: ", e);
            throw e;
        }
    }
}
