package com.EduExplore.System.controller;
import com.EduExplore.System.model.ServiceProvider;
import com.EduExplore.System.service.ServiceProviderService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.EduExplore.System.service.TravellerService;
import com.EduExplore.System.model.Traveller;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {
    @Autowired
    private TravellerService travellerService;

    @Autowired
    private ServiceProviderService serviceProviderService;

    @PostMapping("/signup")
    public ResponseEntity<String> add(@RequestBody Traveller traveller) {
        try {
            travellerService.saveTraveller(traveller);
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding the new traveller");
        }
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {

        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        Traveller traveller = travellerService.loginTraveller(username, password);

        try {
            if (traveller != null) {
                SecureRandom secureRandom = new SecureRandom();
                byte[] key = new byte[32]; // 32 bytes = 256 bits
                secureRandom.nextBytes(key);
                String base64Key = Base64.getEncoder().encodeToString(key);

                // Create JWT Token using the secret key
                String token = Jwts.builder()
                        .setSubject(username)
                        .claim("id", traveller.getId())// Add ID to the token
                        .claim("username", traveller.getUsername()) // Add Username to the token
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                        .signWith(SignatureAlgorithm.HS256, base64Key)
                        .compact();

                // Return token in response
                return ResponseEntity.ok(Map.of("token", token));
            } else {
                return ResponseEntity.ok("Username or password is incorrect!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding the new traveller" +e);
        }
    }
    @PostMapping("/serviceProviderSignup")
    public ResponseEntity<String> add(@RequestBody ServiceProvider serviceProvider) {
        try {
            if (serviceProviderService.ifUsernameExists(serviceProvider.getUsername())) {
                return ResponseEntity.ok("Username already exists");
            }

            if (serviceProviderService.ifEmailExists(serviceProvider.getEmail())) {
                return ResponseEntity.ok("Email already exists");
            }

            serviceProviderService.signupServiceProvider(serviceProvider);
            return ResponseEntity.ok("ok");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while adding the new service provider");
        }
    }

    // Inner class representing the login request JSON structure
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
