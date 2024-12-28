package com.EduExplore.System.model;

import jakarta.persistence.*;

@Entity
public class InquiryForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String message;

    @Enumerated(EnumType.STRING)
    private InquiryStatus status;

    public int getId(){
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public InquiryStatus getStatus() {
        return status;
    }

    public void setStatus(InquiryStatus status) {
        this.status = status;
    }

    public enum InquiryStatus {
        PENDING,
        IN_PROGRESS,
        RESPONDED
    }
}
