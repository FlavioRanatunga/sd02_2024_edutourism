package com.EduExplore.System.model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class ServiceProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String email;
    private String username;
    private String password;
    private String serviceType;
    private String serviceProviderDescription;

    private String otp;

    private boolean approved;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "service_provider_id", referencedColumnName = "id")
    private List<Program> services;

    public ServiceProvider() {
        // Initialize the services list
        this.services = new ArrayList<>();
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

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public String getServiceProviderDescription() {
        return serviceProviderDescription;
    }

    public void setServiceProviderDescription(String serviceProviderDescription) {
        this.serviceProviderDescription = serviceProviderDescription;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

//    public List<Course> getServices() { return services; }
//
//    public void addService(Course course) {
//        services.add(course);
//        course.setServiceProvider(this);
//    }
}
