package com.EduExplore.System.controller;

import com.EduExplore.System.model.Itinerary;
import com.EduExplore.System.model.Traveller;
import com.EduExplore.System.service.TravellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.EduExplore.System.controller.SettingsController.logger;

@RestController
@RequestMapping("/api/travellers")
@CrossOrigin
public class TravellerController {

    @Autowired
    private TravellerService travellerService;

    // Other existing endpoints


    // Add an Itinerary object to the traveller's itinerary
    @PostMapping("/{id}/itinerary")
    public ResponseEntity<?> addLocationToItinerary(@PathVariable int id, @RequestBody Itinerary itinerary) {

        try {
        logger.info("Itinerary to remove CONTROLLER: Location: {}, Description: {}, Date: {}, ID: {}",
                itinerary.getLocation(), itinerary.getDescription(), itinerary.getDate(), itinerary.getId());
        Traveller updatedTraveller = travellerService.addLocationToItinerary(id, itinerary);
        return ResponseEntity.ok(updatedTraveller);

        } catch (Exception e) {
            logger.info("error",e
                   );

            return ResponseEntity.status(500).body("An error occurred while updating the settings");
        }
    }

    // Get the full list of Itinerary objects for a traveller
    @GetMapping("/{id}/itinerary")
    public ResponseEntity<List<Itinerary>> getItinerary(@PathVariable int id) {
        List<Itinerary> itinerary = travellerService.getItinerary(id);
        return ResponseEntity.ok(itinerary);
    }

    // Delete the entire itinerary for a traveller
    @DeleteMapping("/{id}/itinerary")
    public ResponseEntity<Void> deleteItinerary(@PathVariable int id) {
        travellerService.deleteItinerary(id);
        return ResponseEntity.noContent().build();
    }

    // Replace the entire itinerary for a traveller with a new list
    @PostMapping("/{id}/itinerary/update")
    public ResponseEntity<Traveller> setItinerary(@PathVariable int id, @RequestBody List<Itinerary> itinerary) {
        Traveller updatedTraveller = travellerService.setItinerary(id, itinerary);
        return ResponseEntity.ok(updatedTraveller);
    }

    // Remove a specific Itinerary object from the traveller's itinerary
    @DeleteMapping("/{id}/itinerary/location")
    public ResponseEntity<Traveller> removeLocationFromItinerary(@PathVariable int id, @RequestBody Itinerary itinerary) {
        logger.info("Itinerary to remove CONTROLLER: Location: {}, Description: {}, Date: {}, ID: {}",
                itinerary.getLocation(), itinerary.getDescription(), itinerary.getDate(), itinerary.getId());
        Traveller updatedTraveller = travellerService.removeLocationFromItinerary(id, itinerary);
        return ResponseEntity.ok(updatedTraveller);
    }




}

