package com.EduExplore.System.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
public class Traveller {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String country;
    private String email;
    private String username;
    private String password;

    private String Otp;
    private String profilePic;

    private String bookings;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "traveller_id")  // Foreign key in the Itinerary table
    private List<Itinerary> itineraries = new ArrayList<>();


    public List<Integer> getBookingIds() {
        return bookings.isEmpty() ?
                List.of() :
                Arrays.stream(bookings.split(","))
                        .map(Integer::parseInt)
                        .collect(Collectors.toList());
    }


    public String getOtp() {
        return Otp;
    }

    public void setOtp(String otp) {
        Otp = otp;
    }

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

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

    public String getProfilePic() { return profilePic; }

    public void setProfilePic(String profilePic) { this.profilePic = profilePic; }

    public String getBookings() { return bookings; }

    public void setBookings(String bookings) { this.bookings = bookings; }

    public List<Itinerary> getItineraries() {
        return itineraries;
    }
    public void addItinerary(Itinerary itinerary) {
        this.itineraries.add(itinerary);
    }

    // Utility method to remove an itinerary from the list
    public void removeItinerary(Itinerary itineraryToRemove) {
        itineraries.removeIf(itinerary ->
                itinerary.getLocation().equals(itineraryToRemove.getLocation()) &&
                        itinerary.getDescription().equals(itineraryToRemove.getDescription()) &&
                        itinerary.getDate().equals(itineraryToRemove.getDate())
        );
    }
    public void removeItineraryById(int itineraryId) {
        itineraries.removeIf(itinerary -> itinerary.getId() == itineraryId);
    }

    // Utility method to clear the entire itinerary list
    public void clearItinerary() {
        this.itineraries.clear();
    }
}