package com.EduExplore.System.service;


import com.EduExplore.System.controller.AuthController;
import com.EduExplore.System.model.ServiceProvider;
import com.EduExplore.System.repository.ServiceProviderRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class ServiceProviderImpl implements ServiceProviderService{

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;
    static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public ServiceProvider saveServiceProvider(ServiceProvider serviceProvider) {
        return serviceProviderRepository.save(serviceProvider);
    }

    @Override
    public ServiceProvider signupServiceProvider(ServiceProvider serviceProvider) {


        String encodedPassword = passwordEncoder.encode(serviceProvider.getPassword());
        serviceProvider.setPassword(encodedPassword);
        return serviceProviderRepository.save(serviceProvider);
    }


    @Override
    public ServiceProvider loginServiceProvider(String username, String password) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByUsername(username);
        logger.info("Searched for: {}"+ username+ password);

        if(serviceProvider != null && serviceProvider.getPassword().equals(password)){

            return serviceProvider;
        }
        return null;
    }

    @Override
    public ServiceProvider getServiceProviderDetailsById(int id) {
        return serviceProviderRepository.findById(id);
    }

    @Override
    public ServiceProvider updateServiceProvider(String username, ServiceProvider updatedServiceProvider) {
        ServiceProvider existingServiceProvider = serviceProviderRepository.findByUsername(username);
        if (existingServiceProvider != null) {
            existingServiceProvider.setName(updatedServiceProvider.getName());
            existingServiceProvider.setEmail(updatedServiceProvider.getEmail());
            existingServiceProvider.setServiceType(updatedServiceProvider.getServiceType());
            existingServiceProvider.setServiceProviderDescription(updatedServiceProvider.getServiceProviderDescription());
            return serviceProviderRepository.save(existingServiceProvider);
        }
        return null;
    }

    public boolean ifUsernameExists(String username) {
        return serviceProviderRepository.existsByUsername(username);
    }

    public boolean ifEmailExists(String email) {
        return serviceProviderRepository.existsByEmail(email);
    }

    @Override
    public String sendOtp(String email) {

        //  ServiceProvider serviceProvider1 = serviceProviderRepository.findByUsername(username);
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);

        if ( serviceProvider !=null ){
            String otp = generateOtp(10);
            serviceProvider.setOtp(otp);
            serviceProviderRepository.save(serviceProvider);

            try {
                // Create a MIME message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                // HTML content for the email with gradient background
                String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: linear-gradient(to bottom, #5c8b9f, #194574);'>"
                        + "<div style='text-align: center;'>"
                        + "<img src='https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/logo.jpg?alt=media&token=b5515d5f-1257-4b9b-8566-f4a71b66c75a' alt='EduExplore Logo' style='max-width: 150px; margin-bottom: 20px; border-radius: 10px;'>"
                        + "</div>"
                        + "<p style='font-size: 18px; color: #fff;'>Dear " + serviceProvider.getName() + ",</p>"
                        + "<p style='font-size: 16px; color: #fff;'>We received a request to reset your password. Please use the following OTP (One-Time Password) to proceed with the reset:</p>"
                        + "<div style='text-align: center; margin: 20px 0;'>"
                        + "<h2 style='color: #66b3ff; font-size: 32px; letter-spacing: 2px;'>" + otp + "</h2>"
                        + "</div>"
                        + "<p style='font-size: 16px; color: #fff;'>If you did not request this password reset, please ignore this email. Your password will remain unchanged.</p>"
                        + "<br>"
                        + "<p style='font-size: 16px; color: #fff;'>Best regards,<br><strong>The EduExplore Team</strong></p>"
                        + "<hr style='margin-top: 30px; border: none; border-top: 1px solid #eee;'>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>This e-mail was sent from <a href='http://localhost:8080/' style='color: #007bff;'>http://localhost:8080/</a></p>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>Powered by SD02_2024</p>"
                        + "</div>";

                // Set the MIME message content and properties
                helper.setTo(email);
                helper.setSubject("Your OTP for Password Reset - EduExplore");
                helper.setText(htmlMsg, true); // 'true' means this email is HTML

                // Send the email
                javaMailSender.send(mimeMessage);

            } catch (MessagingException e) {
                // Handle the exception properly
                e.printStackTrace();
            }

            return otp;
        }
        else {
            throw new RuntimeException("Invalid email address.");
        }

    }

    @Override
    public String VerifyOtp(String otp, String email) {

        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        if (serviceProvider!=null && serviceProvider.getOtp().equals(otp)){
            String message = "OTP is correct";
            return message;

        }
        else {
            throw new RuntimeException("Invalid email address.");
        }
    }

    @Override
    public String addNewPassword(String password,String confirmPassword, String email) {

        String message;

        if (!(password.equals(confirmPassword))){
            message = "Passwords don't match";

        }
        else{
            ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
            String encodedPassword = passwordEncoder.encode(password);

            serviceProvider.setPassword(encodedPassword);
            serviceProviderRepository.save(serviceProvider);
            logger.info("Searched for pw in implementation: {}", password);

            message = "Password changed successfully!";

        }

        return message;
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

    @Override
    public ServiceProvider saveServiceProviderMain(ServiceProvider serviceProvider) {
        return serviceProviderRepository.save(serviceProvider);
    }

    @Override
    public ServiceProvider loginServiceProviderLogin(String username, String password) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByUsername(username);
        if (serviceProvider != null && passwordEncoder.matches(password,serviceProvider.getPassword())) {
            return serviceProvider;
        }
        return null;
    }

    @Override
    public String LoginSendOtp(String email, String username) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByEmail(email);
        ServiceProvider serviceProviderByUsername = serviceProviderRepository.findByUsername(username);

        if (serviceProvider != null && serviceProviderByUsername.getEmail().equals(email)) {
            String otp = generateOtp(6);
            serviceProviderByUsername.setOtp(otp);
            serviceProviderRepository.save(serviceProviderByUsername);

            try {
                // Create a MIME message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                // HTML content for the email with gradient background
                String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: linear-gradient(to bottom, #5c8b9f, #194574);'>"
                        + "<div style='text-align: center;'>"
                        + "<img src='https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/logo.jpg?alt=media&token=b5515d5f-1257-4b9b-8566-f4a71b66c75a' alt='EduExplore Logo' style='max-width: 150px; margin-bottom: 20px; border-radius: 10px;'>"
                        + "</div>"
                        + "<p style='font-size: 18px; color: #fff;'>Dear " + serviceProvider.getName() + ",</p>"
                        + "<p style='font-size: 16px; color: #fff;'>We received a request to authenticate your login attempt. Please use the following OTP (One-Time Password) to complete your login:</p>"
                        + "<div style='text-align: center; margin: 20px 0;'>"
                        + "<h2 style='color: #66b3ff; font-size: 32px; letter-spacing: 2px;'>" + otp + "</h2>"
                        + "</div>"
                        + "<p style='font-size: 16px; color: #fff;'>If you did not request this login, please ignore this email or contact our support team immediately. Your account remains secure unless the OTP is used.</p>"
                        + "<br>"
                        + "<p style='font-size: 16px; color: #fff;'>Best regards,<br><strong>The EduExplore Team</strong></p>"
                        + "<hr style='margin-top: 30px; border: none; border-top: 1px solid #eee;'>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>This e-mail was sent from <a href='http://localhost:8080/' style='color: #007bff;'>http://localhost:8080/</a></p>"
                        + "<p style='font-size: 12px; color: #fff; text-align: center;'>Powered by SD02_2024</p>"
                        + "</div>";

                // Set the MIME message content and properties
                helper.setTo(email);
                helper.setSubject("Your OTP for Login Verification - EduExplore");
                helper.setText(htmlMsg, true); // 'true' means this email is HTML

                // Send the email
                javaMailSender.send(mimeMessage);

            } catch (MessagingException e) {
                // Handle the exception properly
                e.printStackTrace();
            }

            return "OTP sent successfully!";
        } else {
            throw new RuntimeException("Invalid email address.");
        }
    }

    @Override
    public ServiceProvider LoginVerifyOtp(String otp, String username) {
        ServiceProvider serviceProvider = serviceProviderRepository.findByUsername(username);

        if (serviceProvider != null && serviceProvider.getOtp().equals(otp)) {
//            return "OTP verified successfully!";
            return serviceProvider;
        } else {
            throw new RuntimeException("Invalid OTP.");
        }
    }


};