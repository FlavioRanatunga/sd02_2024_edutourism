package com.EduExplore.System.service;

import com.EduExplore.System.model.Admin;

public interface AdminService {
    public Admin createAdmin(Admin admin);

    public Admin saveAdmin(Admin admin);

    public Admin loginAdmin(String username, String password);

    public String sendOtp(String username);

    public Admin VerifyOtp(String otp,String username);
}
