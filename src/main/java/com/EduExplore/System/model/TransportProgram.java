package com.EduExplore.System.model;

import jakarta.persistence.Entity;

@Entity
public class TransportProgram extends Program {

    private String transportType;  // Car, Bus, Flight, etc.
    private String vehicleType;  // Type of vehicle (e.g., car, bike)
    private int unitPrice;  // Price per unit (e.g., per hour, per day)
    private int maxPassengers;  // Maximum number of passengers
    private boolean isSelfDrive;  // Whether the vehicle can be self-driven

    private String date;  // Date of transport
    private String pickupTime;  // Pickup time
    private String pickupLocation;  // Pickup location
    private String dropoffLocation;  // Dropoff location
    private int passengers;  // Number of passengers

    // Getters and Setters
    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public int getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(int unitPrice) {
        this.unitPrice = unitPrice;
    }

    public int getMaxPassengers() {
        return maxPassengers;
    }

    public void setMaxPassengers(int maxPassengers) {
        this.maxPassengers = maxPassengers;
    }

    public boolean isSelfDrive() {
        return isSelfDrive;
    }

    public void setSelfDrive(boolean selfDrive) {
        isSelfDrive = selfDrive;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public String getDropoffLocation() {
        return dropoffLocation;
    }

    public void setDropoffLocation(String dropoffLocation) {
        this.dropoffLocation = dropoffLocation;
    }

    public int getPassengers() {
        return passengers;
    }

    public void setPassengers(int passengers) {
        this.passengers = passengers;
    }
}
