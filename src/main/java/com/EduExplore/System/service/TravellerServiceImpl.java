package com.EduExplore.System.service;

import com.EduExplore.System.controller.AuthController;
import com.EduExplore.System.model.Itinerary;
import com.EduExplore.System.model.Program;
import com.EduExplore.System.model.Traveller;
import com.EduExplore.System.repository.ProgramRepository;
import com.EduExplore.System.repository.TravellerRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@Service
public class TravellerServiceImpl implements TravellerService {
    public static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private TravellerRepository TravellerRepository;

    @Autowired
    private ProgramRepository courseRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public Traveller saveTraveller(Traveller traveller) {

        String encodedPassword = passwordEncoder.encode(traveller.getPassword());
        traveller.setPassword(encodedPassword);
        return TravellerRepository.save(traveller);
    }

    @Override
    public Traveller updateTraveller(Traveller traveller) {


        return TravellerRepository.save(traveller);
    }
    @Override
    public Traveller saveTravellerBooking(int travellerID, int serviceID) {

        System.out.println("traveller ID : "+travellerID);
        logger.info("traveller ID for: {}",travellerID);

        Optional<Traveller> optionalTraveller = TravellerRepository.findById(Integer.valueOf(travellerID));
        // Check if a Traveller was found
        if (optionalTraveller.isPresent()) {
            Traveller traveller = optionalTraveller.get();
            if (traveller.getBookings() == null || traveller.getBookings().trim().isEmpty()) {
                traveller.setBookings("");
            }
            String updatedBookings = traveller.getBookings();
            List<String> bookingList = new ArrayList<>(Arrays.asList(traveller.getBookings().split(",")));

            // Check if serviceID is already in the list
            if (!bookingList.contains(String.valueOf(serviceID))) {
                // Add the serviceID to the list
                bookingList.add(String.valueOf(serviceID));
                updatedBookings = String.join(",", bookingList);
            } else {
                logger.info("ServiceID {} is already present in the bookings list", serviceID);
            }

            // Join the updated list back to a comma-separated string


            // Update the traveller's bookings
            traveller.setBookings(updatedBookings);
            // String bookings = traveller.getBookings();

            // String updatedBookings = bookings +","+ serviceID;

            //  traveller.setBookings(updatedBookings);
            return TravellerRepository.save(traveller);
        } else {
            throw new RuntimeException("Traveller not found with id: " + travellerID); // Handle the absence of Traveller
        }


    }
    @Override
    public Traveller getTravellerById(String id)
    {
        Optional<Traveller> optionalTraveller = TravellerRepository.findById(Integer.valueOf(id));
        // Check if a Traveller was found
        if (optionalTraveller.isPresent()) {
            return optionalTraveller.get(); // Return the Traveller object
        } else {
            throw new RuntimeException("Traveller not found with id: " + id); // Handle the absence of Traveller
        }
    }
    @Override
    public Traveller loginTraveller(String username, String password) {
        Traveller traveller = TravellerRepository.findByUsername(username);
        logger.info("Searched for: {}" + username + password);

        // logger.info("Searched for: {}",
        // TravellerRepository.findByUsername(username).getUsername()+
        // TravellerRepository.findByUsername(username).getPassword());
        if (traveller != null && passwordEncoder.matches(password, traveller.getPassword())) {
            return traveller;
        }
        return null; // Return null if traveller is not found or password does not match
    }


    @Override
    public String sendOtp(String email) {
        // Fetch the user (Traveller) from the database
        Traveller traveller = TravellerRepository.findByEmail(email);

        if (traveller != null) {
            // Generate a random OTP
            String otp = generateOtp(10);

            // Update the user's OTP in the database
            traveller.setOtp(otp);
            TravellerRepository.save(traveller);

            try {
                // Create a MIME message
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                // HTML content for the email with gradient background
                String htmlMsg = "<div style='font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background: linear-gradient(to bottom, #5c8b9f, #194574);'>"
                        + "<div style='text-align: center;'>"
                        + "<img src='https://firebasestorage.googleapis.com/v0/b/eduexplore-4ac4e.appspot.com/o/logo.jpg?alt=media&token=b5515d5f-1257-4b9b-8566-f4a71b66c75a' alt='EduExplore Logo' style='max-width: 150px; margin-bottom: 20px; border-radius: 10px;'>"
                        + "</div>"
                        + "<p style='font-size: 18px; color: #fff;'>Dear " + traveller.getName() + ",</p>"
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
        } else {
            throw new RuntimeException("Invalid email address.");
        }
    }

    // Example OTP generation method



    @Override
    public String VerifyOtp(String otp, String email) {
        System.out.println("Verifying OTP for email: " + email); // Print the email to the console

        Traveller traveller = TravellerRepository.findByEmail(email);

        if (traveller != null) {
            System.out.println("Traveller's OTP: " + traveller.getOtp()); // Print the traveller's OTP
            System.out.println("Received OTP: " + otp); // Print the received OTP

            if (traveller.getOtp().equals(otp)) {
                String message = "OTP is correct";
                return message;
            } else {
                throw new RuntimeException("Invalid OTP.");
            }
        } else {
            throw new RuntimeException("Invalid email address.");
        }
    }


    @Override
    public String addNewPassword(String newPassword, String email) {
        // Print the email to the console for debugging purposes
        System.out.println("Setting new password for email: " + email);

        Traveller traveller = TravellerRepository.findByEmail(email);

        // Check if the traveller is null
        if (traveller == null) {
            System.out.println("No traveller found with email: " + email);
            throw new RuntimeException("Invalid email address.");
        }

        String encodedPassword = passwordEncoder.encode(newPassword);
        traveller.setPassword(encodedPassword);
        // Set the new password for the traveller

        TravellerRepository.save(traveller);

        String message = "Password updated successfully.";
        System.out.println(message); // Print success message to the console
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
    public Traveller getTravellerByUsername(String username) {
        return TravellerRepository.findByUsername(username); // Updated to find by username
    }

    @Override
    public Traveller updateTravellerByUsername(String username, Traveller updatedTraveller) {
        // Find the existing traveller by username
        Traveller existingTraveller = TravellerRepository.findByUsername(username);
        if (existingTraveller != null) {
            // Update fields
            existingTraveller.setName(updatedTraveller.getName());
            existingTraveller.setEmail(updatedTraveller.getEmail());
            existingTraveller.setCountry(updatedTraveller.getCountry());
            existingTraveller.setUsername(updatedTraveller.getUsername());
            if (updatedTraveller.getPassword() != null) {
                existingTraveller.setPassword(updatedTraveller.getPassword()); // Consider hashing the password
            }
            if (updatedTraveller.getProfilePic() != null) {
                existingTraveller.setProfilePic(updatedTraveller.getProfilePic());
            }
            logger.info("Updating Traveller with ID: {}", existingTraveller.getId());


            // Save the updated traveller
            return TravellerRepository.save(existingTraveller);
        }
        else {
            throw new EntityNotFoundException("Traveller not found with username: " + username);
        }
    }

    @Override
    public Traveller saveProfilePic(int id, String link){
        Traveller traveller = TravellerRepository.findById(id).orElseThrow(() -> new RuntimeException("Traveller not found"));
        traveller.setProfilePic(link);
        return TravellerRepository.save(traveller);
    }


    @Override
    public List<String> getPersonalizedSuggestions(int travellerId, String searchString) {
        Traveller traveller = TravellerRepository.findById(travellerId).orElse(null);
        if (traveller == null) {
            return List.of();
        }

        if (searchString == null || searchString.isEmpty()) {
            return List.of();
        }

        String firstLetter = searchString.substring(0, 1);
        return courseRepository.findTitlesByTitleStartingWith(firstLetter);
    }

    @Override
    public Traveller addLocationToItinerary(int travellerId, Itinerary itinerary) {
        Optional<Traveller> travellerOptional = TravellerRepository.findById(travellerId);
        if (travellerOptional.isPresent()) {
            Traveller traveller = travellerOptional.get();
            traveller.addItinerary(itinerary); // Add the Itinerary object
            return TravellerRepository.save(traveller);
        } else {
            throw new RuntimeException("Traveller not found with ID: " + travellerId);
        }
    }

    @Override
    public List<Itinerary> getItinerary(int travellerId) {
        Optional<Traveller> travellerOptional = TravellerRepository.findById(travellerId);
        if (travellerOptional.isPresent()) {
            return travellerOptional.get().getItineraries(); // Return a list of Itinerary objects
        } else {
            throw new RuntimeException("Traveller not found with ID: " + travellerId);
        }
    }

    @Override
    public void deleteItinerary(int travellerId) {
        Optional<Traveller> travellerOptional = TravellerRepository.findById(travellerId);
        if (travellerOptional.isPresent()) {
            Traveller traveller = travellerOptional.get();
            traveller.clearItinerary(); // Assuming a method to clear the entire itinerary list
            TravellerRepository.save(traveller);
        } else {
            throw new RuntimeException("Traveller not found with ID: " + travellerId);
        }

    }

    @Override
    public Traveller setItinerary(int travellerId, List<Itinerary> itinerary) {
        deleteItinerary(travellerId);
        Optional<Traveller> travellerOptional = TravellerRepository.findById(travellerId);
        if (travellerOptional.isPresent()) {
            Traveller traveller = travellerOptional.get();
            for (Itinerary itinerary1 : itinerary) {
                addLocationToItinerary(travellerId, itinerary1);
            }
            return TravellerRepository.save(traveller);
        } else {
            throw new RuntimeException("Traveller not found with ID: " + travellerId);
        }
    }

    @Override
    public Traveller removeLocationFromItinerary(int travellerId, Itinerary itinerary) {


        logger.info("Attempting to remove itinerary for traveller with ID: {}", travellerId);

        Optional<Traveller> travellerOptional = TravellerRepository.findById(travellerId);
        if (travellerOptional.isPresent()) {
            Traveller traveller = travellerOptional.get();

            logger.info("Found traveller: {}", traveller.getName());  // Logs the traveller's name

            // Log the itinerary details
            logger.info("Itinerary to remove SERVICE IMPL: Location: {}, Description: {}, Date: {}, ID: {}",
                    itinerary.getLocation(), itinerary.getDescription(), itinerary.getDate(), itinerary.getId());

            //Remove itinerary by ID if it exists, otherwise by matching fields
            if (itinerary.getId() != 0) {
                logger.info("Removing itinerary by ID: {}", itinerary.getId());
                traveller.removeItineraryById(itinerary.getId());
            } else {
                logger.info("Removing itinerary by matching fields");
                traveller.removeItinerary(itinerary);
            }

            Traveller updatedTraveller = TravellerRepository.save(traveller);

            // Log the updated traveller's itinerary
            logger.info("Updated itinerary for traveller after removal: {}", updatedTraveller.getItineraries());

            return updatedTraveller;
        } else {
            logger.error("Traveller not found with ID: {}", travellerId);
            throw new RuntimeException("Traveller not found with ID: " + travellerId);
        }
    }


}
