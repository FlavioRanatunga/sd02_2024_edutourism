package com.EduExplore.System.service;

import com.EduExplore.System.model.ServiceProvider;

public interface ServiceProviderService {
    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider);

    public ServiceProvider signupServiceProvider(ServiceProvider serviceProvider);

    public ServiceProvider loginServiceProvider(String username, String password);
    public ServiceProvider getServiceProviderDetailsById(int id);
    public ServiceProvider updateServiceProvider(String username, ServiceProvider updatedServiceProvider);
    boolean ifUsernameExists(String username);
    boolean ifEmailExists(String email);

    public String sendOtp(String email);

    public String VerifyOtp(String otp,String email);
    public String addNewPassword(String password,String confirmPassword,String email);

    ServiceProvider saveServiceProviderMain(ServiceProvider serviceProvider);
    ServiceProvider loginServiceProviderLogin(String username, String password);
    String LoginSendOtp(String email, String username);
    ServiceProvider LoginVerifyOtp(String otp, String username);
}
