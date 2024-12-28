package com.EduExplore.System.controller;


import com.EduExplore.System.service.ServiceProviderService;
import com.EduExplore.System.service.TravellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



// EmailController.java
@RestController
@RequestMapping("/npw")
@CrossOrigin
public class NewPasswordController {

    @Autowired
    private TravellerService otpService;

    @Autowired
    private ServiceProviderService serviceProviderNewPwService;

    @PostMapping("/NewPassword")
    public String newPassword(@RequestBody NewPasswordController.PasswordRequest pwRequest) {
        //logger.info("Searched for: {}", pwRequest.getPassword());
        return otpService.addNewPassword(pwRequest.getPassword(),pwRequest.getEmail());

        //return ResponseEntity.ok("OTP sent successfully!");
    }

    @PostMapping("/serviceProvider/NewPassword")
    public ResponseEntity<String> serviceProviderNewPassword(@RequestBody NewPasswordController.PasswordRequest pwRequest) {

        try {
            String message = serviceProviderNewPwService.addNewPassword(pwRequest.getPassword(), pwRequest.getConfirmPassword(), pwRequest.getEmail());

            if (message == "Passwords don't match") {
                return ResponseEntity.ok("Passwords don't match");
            }

            else {
                return ResponseEntity.ok("Password changed successfully!");
            }
        }
        catch(Exception e){
            return ResponseEntity.status(500).body("An error occurred while updating password");
        }

    }

    static class PasswordRequest {
        private String password;
        private String email;

        private String confirmPassword;

        public String getPassword() {
            return password;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public String getConfirmPassword() {
            return confirmPassword;
        }

        public void setConfirmPassword(String confirmPassword) {
            this.confirmPassword = confirmPassword;
        }

    }
}

