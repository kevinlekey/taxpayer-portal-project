package com.trs_v1.taxpayer_registration_system_backend.model;

import java.util.Collections;
import java.util.List;

public class ErrorResponse {
    private String error;
    private List<String> messages;

    public ErrorResponse(String error, List<String> messages) {
        this.error = error;
        this.messages = messages;
    }

    public ErrorResponse(String error, String message) {
        this.error = error;
        this.messages = Collections.singletonList(message);
    }

    // Getters and setters
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }
}
