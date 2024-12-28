package com.EduExplore.System.service;

import com.EduExplore.System.model.Admin;
import com.EduExplore.System.model.InquiryForm;
import com.EduExplore.System.repository.AdminRepository;
import com.EduExplore.System.repository.InquiryFormRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private InquiryFormRepository inquiryFormRepository;

    /*@Override
    public void submitForm(String name, String email, String message) {
        List<String> adminEmails = adminRepository.findAll().stream()
                .map(Admin::getEmail)
                .collect(Collectors.toList());

        for (String adminEmail : adminEmails) {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(adminEmail);
            msg.setSubject("New Form Submission");
            msg.setText("Name: " + name + "\n" +
                    "Email: " + email + "\n" +
                    "Message: " + message);
            javaMailSender.send(msg);
        }
    }*/

    @Override
    public List<InquiryForm> getAllInquiries() {
        return inquiryFormRepository.findAll();
    }

    @Override
    public void submitForm(String name, String email, String message) {
        List<String> adminEmails = adminRepository.findAll().stream()
                .map(Admin::getEmail)
                .collect(Collectors.toList());

        InquiryForm inquiryForm = new InquiryForm();
        inquiryForm.setName(name);
        inquiryForm.setEmail(email);
        inquiryForm.setMessage(message);
        inquiryForm.setStatus(InquiryForm.InquiryStatus.PENDING);
        inquiryFormRepository.save(inquiryForm);

        for (String adminEmail : adminEmails) {
            try {
                // Create a MIME message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                // HTML content for the email with improved styling
                String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;'>"
                        + "<h2 style='text-align: center; color: #007bff;'>New Form Submission</h2>"
                        + "<p>Hello Admin,</p>"
                        + "<p>A new form has been submitted on your website. Here are the details:</p>"
                        + "<table style='border-collapse: collapse; width: 100%; max-width: 600px; background-color: #f9f9f9; padding: 15px; border-radius: 10px;'>"
                        + "<tr><td style='padding: 8px; border-bottom: 1px solid #ddd;'><strong>Name:</strong></td><td style='padding: 8px; border-bottom: 1px solid #ddd;'>" + name + "</td></tr>"
                        + "<tr><td style='padding: 8px; border-bottom: 1px solid #ddd;'><strong>Email:</strong></td><td style='padding: 8px; border-bottom: 1px solid #ddd;'>" + email + "</td></tr>"
                        + "<tr><td style='padding: 8px;'><strong>Message:</strong></td><td style='padding: 8px;'>" + message + "</td></tr>"
                        + "</table>"
                        + "<br><p>Please review this submission at your earliest convenience.</p>"
                        + "<p>Best regards,<br><strong>Your Website Team</strong></p>"
                        + "<br><small>This e-mail was sent from http://localhost:8080/</small><br>"
                        + "<small>Powered by SD02_2024</small>"
                        + "</div>";

                // Set the MIME message content and properties
                helper.setTo(adminEmail);
                helper.setSubject("New Form Submission Notification");
                helper.setText(htmlMsg, true); // 'true' means this email is HTML

                // Send the email
                javaMailSender.send(mimeMessage);

            } catch (MessagingException e) {
                // Handle the exception properly
                e.printStackTrace();
            }
        }
    }

    @Override
    public void respondToInquiry(int id, String response) {
        InquiryForm inquiryForm = inquiryFormRepository.getById(id);
        String userEmail = inquiryForm.getEmail();
        String userName = inquiryForm.getName();
        String userQuestion = inquiryForm.getMessage();
        String adminResponse = response;
        inquiryForm.setStatus(InquiryForm.InquiryStatus.RESPONDED);
        inquiryFormRepository.save(inquiryForm);

        try {
            // Create a MIME message
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            // HTML content for the email with refined styles
            String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6;'>"
                    + "<p>Dear " + userName + ",</p>"
                    + "<p>Thank you for reaching out to us with your inquiry. We have received your message:</p>"
                    + "<blockquote style='background-color: #f9f9f9; border-left: 4px solid #ccc; padding: 10px; font-size: 16px; margin: 15px 0;'>"
                    + userQuestion + "</blockquote>"
                    + "<p>Our response to your inquiry is as follows:</p>"
                    + "<blockquote style='background-color: #e8f4ff; border-left: 4px solid #007bff; padding: 10px; font-size: 16px; margin: 15px 0;'>"
                    + adminResponse + "</blockquote>"
                    + "<p>If you have any further questions or need additional assistance, feel free to reach out to us.</p>"
                    + "<br>"
                    + "<p>Best regards,<br><strong>The EduExplore Team</strong></p>"
                    + "<br><br>"
                    + "<small>This e-mail was sent from <a href='http://localhost:8080/' style='color: #007bff;'>http://localhost:8080/</a></small><br>"
                    + "<small>Powered by SD02_2024</small>"
                    + "</div>";

            // Set the MIME message content and properties
            helper.setTo(userEmail);
            helper.setSubject("Response to Your Inquiry - EduExplore");
            helper.setText(htmlMsg, true); // 'true' means this email is HTML

            // Send the email
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            // Handle the exception properly
            e.printStackTrace();
        }

    }




}
