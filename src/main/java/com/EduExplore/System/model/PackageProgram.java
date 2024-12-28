package com.EduExplore.System.model;

import jakarta.persistence.Entity;

@Entity
public class PackageProgram extends Program {

    private String startDate;  // Start date of the package
    private String endDate;  // End date of the package
    private int participants;  // Number of participants
    private String accommodationType;  // Type of accommodation
    private String specialRequests;  // Any special requests for the package
    private String packageType;  // Type of package (e.g., honeymoon, family)
    private String packageLocations;  // Locations covered in the package

    // Getters and Setters
    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public String getAccommodationType() {
        return accommodationType;
    }

    public void setAccommodationType(String accommodationType) {
        this.accommodationType = accommodationType;
    }

    public String getSpecialRequests() {
        return specialRequests;
    }

    public void setSpecialRequests(String specialRequests) {
        this.specialRequests = specialRequests;
    }

    public String getPackageType() {
        return packageType;
    }

    public void setPackageType(String packageType) {
        this.packageType = packageType;
    }

    public String getPackageLocations() {
        return packageLocations;
    }

    public void setPackageLocations(String packageLocations) {
        this.packageLocations = packageLocations;
    }
}
