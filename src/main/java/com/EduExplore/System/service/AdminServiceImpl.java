package com.EduExplore.System.service;

import com.EduExplore.System.model.Admin;
import com.EduExplore.System.model.ServiceProvider;
import com.EduExplore.System.model.Traveller;
import com.EduExplore.System.repository.AdminRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.Random;
import java.util.logging.Logger;



@Service
public class AdminServiceImpl implements AdminService{
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Admin saveAdmin(Admin admin) {

        return adminRepository.save(admin);
    }

    @Override
    public Admin loginAdmin(String username, String password) {
        Admin admin = adminRepository.findByUsername(username);


        /*if (admin != null && admin.getPassword().equals(password)) {
            return admin;
        }*/
        if (admin != null && passwordEncoder.matches(password, admin.getPassword())) {
            return admin;
        }
        return null; // Return null if traveller is not found or password does not match
    }

    @Override
    public String sendOtp(String username) {

        Admin admin = adminRepository.findByUsername(username);
        String email = admin.getEmail();

        if (admin != null) {
            // Generate a random OTP
            String otp = generateOtp(10);

            // Update the user's OTP in the database
            admin.setOtp(otp);
            adminRepository.save(admin);

            // Send the OTP to the user's email
            try {
                // Create a MIME message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                // HTML content for the admin login OTP email with gradient background
                String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: linear-gradient(to bottom, #5c8b9f, #194574);'>"
                        + "<div style='text-align: center;'>"
                        + "<img src='https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/logo.jpg?alt=media&token=b5515d5f-1257-4b9b-8566-f4a71b66c75a' alt='EduExplore Logo' style='max-width: 150px; margin-bottom: 20px; border-radius: 10px;'>"
                        + "</div>"
                        + "<p style='font-size: 18px; color: #fff;'>Dear Admin,</p>"
                        + "<p style='font-size: 16px; color: #fff;'>We have received a request to authenticate your login to the EduExplore Admin Dashboard. Please use the following OTP (One-Time Password) to verify your identity and complete the login process:</p>"
                        + "<div style='text-align: center; margin: 20px 0;'>"
                        + "<h2 style='color: #66b3ff; font-size: 32px; letter-spacing: 2px;'>" + otp + "</h2>"
                        + "</div>"
                        + "<p style='font-size: 16px; color: #fff;'>For your security, this OTP is valid only for a limited time. If you did not request this login, please contact the security team immediately to ensure your account's safety.</p>"
                        + "<br>"
                        + "<p style='font-size: 16px; color: #fff;'>Best regards,<br><strong>The EduExplore Security Team</strong></p>"
                        + "<hr style='margin-top: 30px; border: none; border-top: 1px solid #eee;'>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>This e-mail was sent from <a href='http://localhost:8080/' style='color: #007bff;'>http://localhost:8080/</a></p>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>Powered by SD02_2024</p>"
                        + "</div>";

                // Set the MIME message content and properties
                helper.setTo(email);
                helper.setSubject("Your Admin OTP for Login Verification - EduExplore");
                helper.setText(htmlMsg, true); // 'true' means this email is HTML

                // Send the email
                javaMailSender.send(mimeMessage);

            } catch (MessagingException e) {
                // Handle the exception properly
                e.printStackTrace();
            }

            return otp;
        } else {
            throw new RuntimeException("Invalid email address.");
        }

    }

    @Override
    public Admin VerifyOtp(String otp, String username) {

        Admin admin = adminRepository.findByUsername(username);

        if (adminRepository!=null && admin.getOtp().equals(otp)){
            String message = "OTP is correct";
            return admin;

        }
        else {
            throw new RuntimeException("Invalid email address.");
        }
    }


    private String generateOtp(int length) {
        // Create a Random instance
        Random rand = new Random();

        // Create a StringBuilder to store the OTP
        StringBuilder otp = new StringBuilder(length);

        // Loop through the desired length
        for (int i = 0; i < length; i++) {
            // Generate a random digit between 0 and 9
            int digit = rand.nextInt(10);

            // Append the digit to the OTP
            otp.append(digit);
        }

        // Return the generated OTP as a string
        return otp.toString();
    }


}

