package com.EduExplore.System.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
public class PreBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int preBookingId;
    private String type;
    private String userIdentification;
    private int itineraryId;
    private int userId;


    private int programId;
    private long bookingTotal;
    private int participants;
    private LocalDateTime bookingTime;
    private String additionalNotes;

    //book Hotel
    private int numNormalRooms;
    private int numLuxRooms;
    private int numLuxTripleRooms;
    private int numFamilyRooms;
    private int numAdults;
    private int numChildren;
    private String checkInDate;
    private String checkOutDate;

    //Book transport
    private String transportDate;
    private String transportPickupTime;
    private String transportDropTime;
    private String transportPickupLocation;
    private String transportDropLocation;


    //Book package
    private String packageDate;

    public int getPreBookingId() {
        return preBookingId;
    }

    public void setPreBookingId(int preBookingId) {
        this.preBookingId = preBookingId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUserIdentification() {
        return userIdentification;
    }

    public void setUserIdentification(String userIdentification) {
        this.userIdentification = userIdentification;
    }

    public int getItineraryId() {
        return itineraryId;
    }

    public void setItineraryId(int itineraryId) {
        this.itineraryId = itineraryId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProgramId() {
        return programId;
    }

    public void setProgramId(int programId) {
        this.programId = programId;
    }

    public long getBookingTotal() {
        return bookingTotal;
    }

    public void setBookingTotal(long bookingTotal) {
        this.bookingTotal = bookingTotal;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public LocalDateTime getBookingTime() {
        return bookingTime;
    }

    public void setBookingTime(LocalDateTime bookingTime) {
        this.bookingTime = bookingTime;
    }

    public String getAdditionalNotes() {
        return additionalNotes;
    }

    public void setAdditionalNotes(String additionalNotes) {
        this.additionalNotes = additionalNotes;
    }

    public int getNumNormalRooms() {
        return numNormalRooms;
    }

    public void setNumNormalRooms(int numNormalRooms) {
        this.numNormalRooms = numNormalRooms;
    }

    public int getNumLuxRooms() {
        return numLuxRooms;
    }

    public void setNumLuxRooms(int numLuxRooms) {
        this.numLuxRooms = numLuxRooms;
    }

    public int getNumLuxTripleRooms() {
        return numLuxTripleRooms;
    }

    public void setNumLuxTripleRooms(int numLuxTripleRooms) {
        this.numLuxTripleRooms = numLuxTripleRooms;
    }

    public int getNumFamilyRooms() {
        return numFamilyRooms;
    }

    public void setNumFamilyRooms(int numFamilyRooms) {
        this.numFamilyRooms = numFamilyRooms;
    }

    public int getNumAdults() {
        return numAdults;
    }

    public void setNumAdults(int numAdults) {
        this.numAdults = numAdults;
    }

    public int getNumChildren() {
        return numChildren;
    }

    public void setNumChildren(int numChildren) {
        this.numChildren = numChildren;
    }

    public String getCheckInDate() {
        return checkInDate;
    }

    public void setCheckInDate(String checkInDate) {
        this.checkInDate = checkInDate;
    }

    public String getCheckOutDate() {
        return checkOutDate;
    }

    public void setCheckOutDate(String checkOutDate) {
        this.checkOutDate = checkOutDate;
    }

    public String getTransportDate() {
        return transportDate;
    }

    public void setTransportDate(String transportDate) {
        this.transportDate = transportDate;
    }

    public String getTransportPickupTime() {
        return transportPickupTime;
    }

    public void setTransportPickupTime(String transportPickupTime) {
        this.transportPickupTime = transportPickupTime;
    }

    public String getTransportDropTime() {
        return transportDropTime;
    }

    public void setTransportDropTime(String transportDropTime) {
        this.transportDropTime = transportDropTime;
    }

    public String getTransportPickupLocation() {
        return transportPickupLocation;
    }

    public void setTransportPickupLocation(String transportPickupLocation) {
        this.transportPickupLocation = transportPickupLocation;
    }

    public String getTransportDropLocation() {
        return transportDropLocation;
    }

    public void setTransportDropLocation(String transportDropLocation) {
        this.transportDropLocation = transportDropLocation;
    }

    public String getPackageDate() {
        return packageDate;
    }

    public void setPackageDate(String packageDate) {
        this.packageDate = packageDate;
    }


}
