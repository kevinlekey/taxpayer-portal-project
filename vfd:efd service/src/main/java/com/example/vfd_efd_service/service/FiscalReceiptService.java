package com.example.vfd_efd_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.vfd_efd_service.model.FiscalReceipt;
import com.example.vfd_efd_service.repository.FiscalReceiptRepository;

@Service
public class FiscalReceiptService {

    @Autowired
    private FiscalReceiptRepository repository;

    public FiscalReceipt saveReceipt(FiscalReceipt receipt) {
        return repository.save(receipt);
    }

    public List<FiscalReceipt> getAllReceipts() {
        return repository.findAll();
    }

    public FiscalReceipt getReceiptById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void deleteReceipt(Long id) {
        repository.deleteById(id);
    }
}
