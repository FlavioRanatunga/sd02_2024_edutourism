package com.EduExplore.System.controller;


import com.EduExplore.System.model.Admin;
import com.EduExplore.System.service.AdminService;
import com.EduExplore.System.service.ServiceProviderService;
import com.EduExplore.System.service.TravellerService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

// OtpController.java
@RestController
@RequestMapping("/Otp")
@CrossOrigin
public class OtpController {
    @Autowired
    private TravellerService otpService;

    @Autowired
    private ServiceProviderService serviceProviderOtpService;

    @Autowired
    private AdminService adminService;


    @PostMapping("/Otp-verify")
    public String verifyOtp(@RequestBody OtpController.OtpRequest otpRequest) {
        return otpService.VerifyOtp(otpRequest.getOtp(),otpRequest.getEmail());
        //return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/serviceProvider/Otp-verify")
    public String verifyServicePorivderOtp(@RequestBody OtpController.OtpRequest otpRequest) {
        return serviceProviderOtpService.VerifyOtp(otpRequest.getOtp(),otpRequest.getEmail());
        //return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/admin/Otp-verify")
    public ResponseEntity<?> verifyAdminOtp(@RequestBody OtpController.AdminOtpRequest otpRequest) {

        Admin admin = adminService.VerifyOtp(otpRequest.getOtp(),otpRequest.getUsername());
        try {
            if (admin != null) {
                SecureRandom secureRandom = new SecureRandom();
                byte[] key = new byte[32]; // 32 bytes = 256 bits
                secureRandom.nextBytes(key);
                String base64Key = Base64.getEncoder().encodeToString(key);

                // Create JWT Token using the secret key
                String token = Jwts.builder()
                        .setSubject(admin.getUsername())
                        .claim("id", admin.getId())// Add ID to the token
                        .claim("username", admin.getUsername()) // Add Username to the token
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                        .signWith(SignatureAlgorithm.HS256, base64Key)
                        .compact();

                // Return token in response
                return ResponseEntity.ok(Map.of("token", token));
            } else {
                return ResponseEntity.ok("OTP verification failed for admin!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while loging in admin" +e);
        }
       // return adminService.VerifyOtp(otpRequest.getOtp(),otpRequest.getUsername());
        //return ResponseEntity.ok("OTP sent successfully!");
    }


    static class OtpRequest {
        private String otp;
        private String email;

        public String getOtp() {
            return otp;
        }

        public String getEmail() {
            return email;
        }


        public void setEmail(String email) {
            this.email = email;
        }

        public void setOtp(String email) {
            this.otp = email;
        }
    }

    static class AdminOtpRequest {
        private String otp;
        private String username;

        public String getOtp() {
            return otp;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public void setOtp(String email) {
            this.otp = email;
        }
    }
}
