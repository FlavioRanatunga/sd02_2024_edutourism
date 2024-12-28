package com.EduExplore.System.controller;



import com.EduExplore.System.service.AdminService;
import com.EduExplore.System.service.ServiceProviderService;
import com.EduExplore.System.service.TravellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// EmailController.java
@RestController
@RequestMapping("/api")
@CrossOrigin
public class EmailController {

    @Autowired
    private TravellerService emailService;

    @Autowired
    private ServiceProviderService serviceProviderEmailService;

    @Autowired
    private AdminService adminEmailService;


    @PostMapping("/forgot-password")
    public String sendOtp(@RequestBody EmailRequest emailRequest) {
        return emailService.sendOtp(emailRequest.getEmail());
        //return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/serviceProvider/forgot-password")
    public String sendServiceProviderOtp(@RequestBody EmailRequest emailRequest) {
        return serviceProviderEmailService.sendOtp(emailRequest.getEmail());
        //return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/admin/sendOtp")
    public String sendAdminOtp(@RequestBody UsernameRequest usernameReq) {
        return adminEmailService.sendOtp(usernameReq.getUsername());
        //return ResponseEntity.ok("OTP sent successfully!");
    }


    static class EmailRequest {
        private String email;


        public String getEmail() {
            return email;
        }



        public void setEmail(String email) {
            this.email = email;
        }
    }

    static class UsernameRequest {
        private String username;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }


}


