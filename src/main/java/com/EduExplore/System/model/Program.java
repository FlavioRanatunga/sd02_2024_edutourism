package com.EduExplore.System.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Program {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;  // Unique identifier

    private String title;  // Name or title of the entity (e.g., course, hotel, etc.)
    private String price;  // Price or cost
    private String location;  // Location of the entity



    @ElementCollection
    private List<String> images =  new ArrayList<>();  // Changed from String to List<String>
    private String type;  // Type (e.g., course, hotel, package, etc.)

    @Lob  // Marks this field as a Large Object (BLOB or CLOB)
    @Column(columnDefinition = "LONGTEXT")
    private String details;  // Description or additional details
    private int ratings;  // Average ratings (e.g., out of 5 stars)
    private String reviews;  // Customer reviews (can be JSON or a list)
    private String paymentRefund;  // Payment and refund policy
    private String contactNumber;  // Contact number
    private String email;  // Contact email
    private int numBookings;  // Total number of bookings made

    private int clickCount;
    private int serviceProviderIdCode;
    private Boolean approved;

    @ManyToOne
    @JoinColumn(name = "service_provider_id")
    private ServiceProvider serviceProvider;

    // Constructors
    public Program() {}

    public Program(List<String> image, String title, String price, String location, String type) {
        this.images = image;
        this.title = title;
        this.price = price;
        this.location = location;
        this.type = type;
    }

    public Program(List<String> image, String title, String price, String location, int serviceProviderId) {
        this.images = image;
        this.title = title;
        this.price = price;
        this.location = location;
        this.serviceProviderIdCode = serviceProviderId;
    }

    public List<String> getImages() {
        return images;
    }

    public void setImages(List<String> images) {
        this.images = images;
    }

    // Getters and Setters
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

//    public String getImage() {
//        return image;
//    }
//
//    public void setImage(String image) {
//        this.image = image;
//    }

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

    public int getClickCount() {
        return clickCount;
    }

    public void incrementClickCount() {
        ++clickCount;
    }

    public int getServiceProviderIdCode() {
        return serviceProviderIdCode;
    }

    public void setServiceProviderIdCode(int serviceProviderId) {
        this.serviceProviderIdCode = serviceProviderId;
    }

    public ServiceProvider getServiceProvider() {
        return serviceProvider;
    }

    public void setServiceProvider(ServiceProvider serviceProvider) {
        this.serviceProvider = serviceProvider;
    }

    public Boolean getApproved() {
        return approved;
    }

    public void setApproved(Boolean approved) {
        this.approved = approved;
    }
}
