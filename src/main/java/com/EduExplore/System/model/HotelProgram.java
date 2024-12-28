package com.EduExplore.System.model;

import jakarta.persistence.Entity;

@Entity
public class HotelProgram extends Program {


    private String hotelWeblink;

    private String checkInDate;
    private String checkOutDate;
    private int rooms;
    private int guestsPerRoom;

    // Hotel-specific fields
    private int luxRoomPrice;  // Price for luxury rooms
    private int normalRoomPrice;  // Price for normal rooms

    private int luxTripleRoomPrice;  // Price for luxury rooms

    public int getLuxTripleRoomPrice() {
        return luxTripleRoomPrice;
    }

    public void setLuxTripleRoomPrice(int luxTripleRoomPrice) {
        this.luxTripleRoomPrice = luxTripleRoomPrice;
    }

    public int getFamilyRoomPrice() {
        return familyRoomPrice;
    }

    public void setFamilyRoomPrice(int familyRoomPrice) {
        this.familyRoomPrice = familyRoomPrice;
    }

    public int getAvailableLuxTripleRooms() {
        return availableLuxTripleRooms;
    }

    public void setAvailableLuxTripleRooms(int availableLuxTripleRooms) {
        this.availableLuxTripleRooms = availableLuxTripleRooms;
    }

    public int getAvailableFamilyRooms() {
        return availableFamilyRooms;
    }

    public void setAvailableFamilyRooms(int availableFamilyRooms) {
        this.availableFamilyRooms = availableFamilyRooms;
    }

    private int familyRoomPrice;

    private int availableLuxTripleRooms;

    private int availableFamilyRooms;
    private int availableLuxRooms;  // Number of luxury rooms available


    private int availableNormalRooms;  // Number of normal rooms available
    private boolean hasParking;  // Whether the hotel offers parking
    private boolean hasBreakfastIncluded;  // Whether breakfast is included
    private boolean isAllInclusive;  // Whether the hotel is all-inclusive
    private String checkInTime;  // Check-in time
    private String checkOutTime;  // Check-out time

    // Getters and Setters for the fields
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

    public int getRooms() {
        return rooms;
    }

    public void setRooms(int rooms) {
        this.rooms = rooms;
    }

    public int getGuestsPerRoom() {
        return guestsPerRoom;
    }

    public void setGuestsPerRoom(int guestsPerRoom) {
        this.guestsPerRoom = guestsPerRoom;
    }

    public int getLuxRoomPrice() {
        return luxRoomPrice;
    }

    public void setLuxRoomPrice(int luxRoomPrice) {
        this.luxRoomPrice = luxRoomPrice;
    }

    public int getNormalRoomPrice() {
        return normalRoomPrice;
    }

    public void setNormalRoomPrice(int normalRoomPrice) {
        this.normalRoomPrice = normalRoomPrice;
    }

    public int getAvailableLuxRooms() {
        return availableLuxRooms;
    }

    public void setAvailableLuxRooms(int availableLuxRooms) {
        this.availableLuxRooms = availableLuxRooms;
    }

    public int getAvailableNormalRooms() {
        return availableNormalRooms;
    }

    public void setAvailableNormalRooms(int availableNormalRooms) {
        this.availableNormalRooms = availableNormalRooms;
    }

    public boolean isHasParking() {
        return hasParking;
    }

    public void setHasParking(boolean hasParking) {
        this.hasParking = hasParking;
    }

    public boolean isHasBreakfastIncluded() {
        return hasBreakfastIncluded;
    }

    public void setHasBreakfastIncluded(boolean hasBreakfastIncluded) {
        this.hasBreakfastIncluded = hasBreakfastIncluded;
    }

    public boolean isAllInclusive() {
        return isAllInclusive;
    }

    public void setAllInclusive(boolean allInclusive) {
        isAllInclusive = allInclusive;
    }

    public String getCheckInTime() {
        return checkInTime;
    }

    public void setCheckInTime(String checkInTime) {
        this.checkInTime = checkInTime;
    }

    public String getCheckOutTime() {
        return checkOutTime;
    }

    public void setCheckOutTime(String checkOutTime) {
        this.checkOutTime = checkOutTime;
    }

    public String getHotelWeblink() {
        return hotelWeblink;
    }

    public void setHotelWeblink(String hotelWeblink) {
        this.hotelWeblink = hotelWeblink;
    }

}
