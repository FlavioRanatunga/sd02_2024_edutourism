package com.EduExplore.System.model;

import jakarta.persistence.Entity;

@Entity
public class EventProgram extends Program {

    private String eventDate;  // Date of the event
    private String startTime;  // Start time of the event
    private int attendees;  // Number of attendees
    private String venue;  // Venue of the event
    private String eventHost;  // Host or organizer of the event
    private String specialRequirements;  // Any special requirements for the event

    // Getters and Setters
    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public int getAttendees() {
        return attendees;
    }

    public void setAttendees(int attendees) {
        this.attendees = attendees;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getEventHost() {
        return eventHost;
    }

    public void setEventHost(String eventHost) {
        this.eventHost = eventHost;
    }

    public String getSpecialRequirements() {
        return specialRequirements;
    }

    public void setSpecialRequirements(String specialRequirements) {
        this.specialRequirements = specialRequirements;
    }

    public void setEventName(String eventName) {
        // You can implement this method if needed
    }

    public void setEventStartTime(String eventStartTime) {
        // You can implement this method if needed
    }
}
