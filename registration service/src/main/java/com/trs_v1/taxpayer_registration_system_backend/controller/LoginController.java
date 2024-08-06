package com.trs_v1.taxpayer_registration_system_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trs_v1.taxpayer_registration_system_backend.model.Taxpayers;
import com.trs_v1.taxpayer_registration_system_backend.service.LoginService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

    @Autowired
    private LoginService loginService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Taxpayers taxpayer = loginService.login(loginRequest.getTin(), loginRequest.getSurname());
        if (taxpayer != null) {
            return ResponseEntity.ok(new LoginResponse("Login Successful", taxpayer.getTin()));
        } else {
            return ResponseEntity.badRequest().body(new LoginResponse("Invalid TIN or surname", null));
        }
    }
}

class LoginRequest {

    private String tin;
    private String surname;

    //getters and setters
    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
}

class LoginResponse {

    private String message;
    private String tin;

    public LoginResponse(String message, String tin) {
        this.message = message;
        this.tin = tin;
    }

    //getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }
}