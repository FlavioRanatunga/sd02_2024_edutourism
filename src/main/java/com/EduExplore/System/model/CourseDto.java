package com.EduExplore.System.model;

import java.util.List;

public class CourseDto {
    private int id;  // Unique identifier
    private String title;  // Name or title of the entity (e.g., course, hotel, etc.)
    private String price;  // Price or cost (can be more specific for different types)
    private String location;  // Location of the entity
    private List<String> image;  // URL of the image
    private String type;  // Type (e.g., course, hotel, package, etc.)
    private String details;  // Description or additional details
    private int ratings;  // Average ratings (e.g., out of 5 stars)
    private String reviews;  // Customer reviews (can be JSON or a list)
    private String paymentRefund;  // Payment and refund policy
    private String contactNumber;  // Contact number
    private String email;  // Contact email
    private int numBookings;  // Total number of bookings made

    // Course-specific fields
    private String duration;  // Duration of the course (e.g., 4 weeks)

    private String educationalFocus;

    private String learningOutcome;

    private String prerequisites;  // Prerequisites needed for the course
    private String courseStartDate;  // Start date of the course
    private String courseEndDate;  // End date of the course
    private String courseLevel;  // Difficulty level of the course (beginner, intermediate, etc.)
    private String courseCategory;  // Category of the course (e.g., technology, arts)
    private String courseAttendance;  // Attendance requirements (e.g., full-time, part-time)
    private int participants;  // Number of participants allowed
    private String instructorName;  // Name of the instructor
    private boolean isCertified;  // Whether a certificate is offered upon completion

    // Hotel-specific fields
    private int luxRoomPrice;  // Price for luxury rooms
    private int normalRoomPrice;  // Price for normal rooms
    private int availableLuxRooms;  // Number of luxury rooms available

    private int luxTripleRoomPrice;  // Price for luxury rooms

    private int availableFamilyRooms;
    private int familyRoomPrice;
    private int availableNormalRooms;  // Number of normal rooms available
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

    public int getAvailableFamilyRooms() {
        return availableFamilyRooms;
    }

    public void setAvailableFamilyRooms(int availableFamilyRooms) {
        this.availableFamilyRooms = availableFamilyRooms;
    }

    private boolean hasParking;  // Whether the hotel offers parking
    private boolean hasBreakfastIncluded;  // Whether breakfast is included
    private boolean isAllInclusive;  // Whether the hotel is all-inclusive
    private String checkInTime;  // Check-in time
    private String checkOutTime;  // Check-out time
    private String checkInDate;
    private String checkOutDate;
    private int rooms;

    public String getHotelWeblink() {
        return hotelWeblink;
    }

    public void setHotelWeblink(String hotelWeblink) {
        this.hotelWeblink = hotelWeblink;
    }

    private String hotelWeblink;

    public String getTravelDate() {
        return travelDate;
    }

    public void setTravelDate(String travelDate) {
        this.travelDate = travelDate;
    }

    public int getTravelers() {
        return travelers;
    }

    public void setTravelers(int travelers) {
        this.travelers = travelers;
    }

    public String getTravelType() {
        return travelType;
    }

    public void setTravelType(String travelType) {
        this.travelType = travelType;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

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

    public String getAccommodationType() {
        return accommodationType;
    }

    public void setAccommodationType(String accommodationType) {
        this.accommodationType = accommodationType;
    }

    public String getTransportType() {
        return transportType;
    }

    public void setTransportType(String transportType) {
        this.transportType = transportType;
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

    public String getPickupTime() {
        return pickupTime;
    }

    public void setPickupTime(String pickupTime) {
        this.pickupTime = pickupTime;
    }

    public int getPassengers() {
        return passengers;
    }

    public void setPassengers(int passengers) {
        this.passengers = passengers;
    }

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

    // TravelLocation-specific fields
    private String travelDate;  // Date of the travel
    private int travelers;  // Number of travelers
    private String guideName;  // Name of the travel guide
    private String travelType;
    private String destination;

    // Package-specific fields
    private String startDate;  // Start date of the package
    private String endDate;  // End date of the package
    private String packageType;  // Type of package (e.g., honeymoon, family)
    private String packageLocations;  // Locations covered in the package
    private String accommodationType;

    // Transport-specific fields
    private String transportType;  // Type of transport (e.g., rental vehicle, rental with driver)
    private String vehicleType;  // Type of vehicle (e.g., car, bike)
    private int unitPrice;  // Price per unit (e.g., per hour, per day)
    private int maxPassengers;  // Maximum number of passengers
    private boolean isSelfDrive;  // Whether the vehicle can be self-driven
    private String pickupLocation;
    private String dropoffLocation;
    private String pickupTime;
    private int passengers;

    // Event-specific fields
    private String eventDate;  // Date of the event
    private String startTime;  // Start time of the event
    private int attendees;  // Number of attendees
    private String venue;  // Venue of the event
    private String eventHost;  // Host or organizer of the event

    // Getters and Setters for all fields

    // Common fields
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<String> getImage() {
        return image;
    }

    public void setImage(List<String> image) {
        this.image = image;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public int getRatings() {
        return ratings;
    }

    public void setRatings(int ratings) {
        this.ratings = ratings;
    }

    public String getReviews() {
        return reviews;
    }

    public void setReviews(String reviews) {
        this.reviews = reviews;
    }

    public String getPaymentRefund() {
        return paymentRefund;
    }

    public void setPaymentRefund(String paymentRefund) {
        this.paymentRefund = paymentRefund;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getNumBookings() {
        return numBookings;
    }

    public void setNumBookings(int numBookings) {
        this.numBookings = numBookings;
    }

    // Getters and Setters for Course-specific fields
    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getEducationalFocus() {
        return educationalFocus;
    }

    public void setEducationalFocus(String educationalFocus) {
        this.educationalFocus = educationalFocus;
    }

    public String getLearningOutcome() {
        return learningOutcome;
    }

    public void setLearningOutcome(String learningOutcome) {
        this.learningOutcome = learningOutcome;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getCourseStartDate() {
        return courseStartDate;
    }

    public void setCourseStartDate(String courseStartDate) {
        this.courseStartDate = courseStartDate;
    }

    public String getCourseEndDate() {
        return courseEndDate;
    }

    public void setCourseEndDate(String courseEndDate) {
        this.courseEndDate = courseEndDate;
    }

    public String getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(String courseLevel) {
        this.courseLevel = courseLevel;
    }

    public String getCourseCategory() {
        return courseCategory;
    }

    public void setCourseCategory(String courseCategory) {
        this.courseCategory = courseCategory;
    }

    public String getCourseAttendance() {
        return courseAttendance;
    }

    public void setCourseAttendance(String courseAttendance) {
        this.courseAttendance = courseAttendance;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public boolean isCertified() {
        return isCertified;
    }

    public void setCertified(boolean certified) {
        isCertified = certified;
    }

    // Getters and Setters for Hotel-specific fields
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

    // Getters and Setters for TravelLocation-specific fields
    public String getGuideName() {
        return guideName;
    }

    public void setGuideName(String guideName) {
        this.guideName = guideName;
    }

    // Getters and Setters for Transport-specific fields
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

    // Getters and Setters for Event-specific fields
    public String getEventHost() {
        return eventHost;
    }

    public void setEventHost(String eventHost) {
        this.eventHost = eventHost;
    }
}

