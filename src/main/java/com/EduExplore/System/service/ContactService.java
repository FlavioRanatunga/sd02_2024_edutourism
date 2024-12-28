package com.EduExplore.System.service;

import com.EduExplore.System.model.InquiryForm;

import java.util.List;

public interface ContactService {

    public void submitForm(String name, String email, String message);
    List<InquiryForm> getAllInquiries();
    void respondToInquiry(int id, String response);
}
