package com.EduExplore.System.controller;

import com.EduExplore.System.model.Traveller;
import com.EduExplore.System.service.TravellerService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/settings")
@CrossOrigin
public class SettingsController {
    static final Logger logger = LoggerFactory.getLogger(SettingsController.class);

    @Autowired
    private TravellerService travellerService;

    @GetMapping("/traveller/{username}")
    @ResponseBody
    public ResponseEntity<Traveller> getTraveller(@PathVariable("username") String username) {
        Traveller traveller = travellerService.getTravellerByUsername(username);
        if (traveller != null) {
            return ResponseEntity.ok(traveller);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<String> updateTraveller(@RequestBody Traveller traveller) {
        try {
            logger.info("Attempting to update Traveller with username: {}", traveller.getUsername());
            //studentService.updateTravellerByUsername(traveller.getUsername(), traveller);
            Traveller updatedTraveller = travellerService.updateTravellerByUsername(traveller.getUsername(), traveller);
            if (updatedTraveller.getUsername() != null) {
                return ResponseEntity.ok("Settings updated successfully");
            } else {
                return ResponseEntity.status(404).body("Traveller not found");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the settings");
        }
    }

    @PostMapping("/{username}/updateProfilePicture")
    public ResponseEntity<Traveller> updateProfilePicture(@PathVariable String username, @RequestBody String profilePictureLink) {
        Traveller traveller = travellerService.getTravellerByUsername(username);
        Traveller updatedTraveller = travellerService.saveProfilePic(traveller.getId(), profilePictureLink);
        return ResponseEntity.ok(updatedTraveller);
    }
}


