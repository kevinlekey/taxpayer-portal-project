package com.trs_v1.taxpayer_registration_system_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.trs_v1.taxpayer_registration_system_backend.model.Taxpayers;
import com.trs_v1.taxpayer_registration_system_backend.repository.TaxpayersRepository;

@Service
public class LoginService {

    @Autowired
    private TaxpayersRepository taxpayersRepository;

    public Taxpayers login(String tin, String surname) {
       Taxpayers taxpayer = taxpayersRepository.findByTinAndSurname(tin, surname);
       return taxpayer;
    }
}
