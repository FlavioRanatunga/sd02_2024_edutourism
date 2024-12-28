package com.EduExplore.System.controller;

import com.EduExplore.System.model.InquiryForm;
import com.EduExplore.System.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping("/contact")
    public ResponseEntity<String> submitForm(@RequestBody ContactRequest contactRequest) {
        contactService.submitForm(contactRequest.name, contactRequest.email, contactRequest.message);
        return ResponseEntity.ok("Form submitted successfully!");
    }

    @GetMapping("/inquiries")
    public ResponseEntity<List<InquiryFormDto>> getAllInquiries() {
        List<InquiryForm> inquiries = contactService.getAllInquiries();
        List<InquiryFormDto> inquiryDtos = inquiries.stream().map(inquiry -> {
            InquiryFormDto dto = new InquiryFormDto();
            dto.setId(inquiry.getId());
            dto.setName(inquiry.getName());
            dto.setEmail(inquiry.getEmail());
            dto.setMessage(inquiry.getMessage());
            dto.setStatus(inquiry.getStatus());
            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(inquiryDtos);
    }

    @PostMapping("/inquiries/respond/{id}")
    public ResponseEntity<String> respondToInquiry(@PathVariable int id, @RequestBody InquiryResponse response) {
        contactService.respondToInquiry(id, response.response);
        return ResponseEntity.ok("Inquiry responded to successfully!");
    }

    static class ContactRequest {
        private String name;
        private String email;
        private String message;

        // Getters and Setters
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
    }

    public class InquiryFormDto {
        private int id;
        private String name;
        private String email;
        private String message;
        private InquiryForm.InquiryStatus status;

        // Getters and Setters
        public int getId() {
            return id;
        }

        public void setId(int id) {
            this.id = id;
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

        public InquiryForm.InquiryStatus getStatus() {
            return status;
        }

        public void setStatus(InquiryForm.InquiryStatus status) {
            this.status = status;
        }
    }

    static class InquiryResponse {
        private String response;

        // Getters and Setters
        public String getResponse() {
            return response;
        }

        public void setResponse(String response) {
            this.response = response;
        }
    }
}
