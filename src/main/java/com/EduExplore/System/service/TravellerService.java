package com.EduExplore.System.service;

import com.EduExplore.System.model.Itinerary;
import com.EduExplore.System.model.Traveller;

import java.util.List;

public interface TravellerService {
    public Traveller saveTraveller(Traveller traveller);

    public Traveller updateTraveller(Traveller traveller);

    public Traveller saveTravellerBooking(int traveller, int serviceID);
    public Traveller getTravellerById(String id);



    public Traveller loginTraveller(String username, String password);

    public String sendOtp(String email);

    public String VerifyOtp(String otp,String email);

    public String addNewPassword(String password,String email);

    public Traveller getTravellerByUsername(String username);

    public Traveller updateTravellerByUsername(String username, Traveller updatedTraveller);

    public Traveller saveProfilePic(int id, String link);

    public List<String> getPersonalizedSuggestions(int travellerId, String search);

    Traveller addLocationToItinerary(int travellerId, Itinerary itinerary);

    List<Itinerary> getItinerary(int travellerId);

    void deleteItinerary(int travellerId);

    Traveller setItinerary(int travellerId, List<Itinerary> itinerary);

    Traveller removeLocationFromItinerary(int travellerId, Itinerary itinerary);


}
