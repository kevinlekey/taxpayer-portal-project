package com.example.vfd_efd_service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vfd_efd_service.model.FiscalReceipt;
import com.example.vfd_efd_service.service.FiscalReceiptService;

@RestController
@RequestMapping("/api/receipts")
@CrossOrigin(origins = "http://localhost:3000")
public class FiscalReceiptController {

    @Autowired
    private FiscalReceiptService service;

    @PostMapping
    public FiscalReceipt createReceipt(@RequestBody FiscalReceipt receipt) {
        return service.saveReceipt(receipt);
    }

    @GetMapping
    public List<FiscalReceipt> getAllReceipts() {
        return service.getAllReceipts();
    }

    @GetMapping("/{id}")
    public FiscalReceipt getReceiptById(@PathVariable Long id) {
        return service.getReceiptById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReceipt(@PathVariable Long id) {
        service.deleteReceipt(id);
    }
}