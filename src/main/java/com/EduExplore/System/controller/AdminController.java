package com.EduExplore.System.controller;

import com.EduExplore.System.model.Admin;
import com.EduExplore.System.model.Traveller;
import com.EduExplore.System.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/add")
    public Admin createAdmin(@RequestBody Admin admin)
    {
        return adminService.createAdmin(admin);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginController.LoginRequest loginRequest) {

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        Admin admin = adminService.loginAdmin(username, password);

        try {
            if (admin != null) {
                adminService.saveAdmin(admin);
                return ResponseEntity.ok("ok");
            }else{
                return ResponseEntity.ok("Username or password is incorrect!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while logging in admin");
        }
    }

    static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
