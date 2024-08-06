package com.trs_v1.taxpayer_registration_system_backend.model;

public class TINResponse {
    private String tin;

    public TINResponse() {
    }

    public TINResponse(String tin) {
        this.tin = tin;
    }

    public String getTin() {
        return tin;
    }

    public void setTin(String tin) {
        this.tin = tin;
    }
}