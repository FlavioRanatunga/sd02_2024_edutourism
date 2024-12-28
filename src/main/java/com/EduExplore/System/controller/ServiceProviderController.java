package com.EduExplore.System.controller;

import com.EduExplore.System.model.*;
import com.EduExplore.System.service.ProgramService;
import com.EduExplore.System.service.ServiceProviderService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static com.EduExplore.System.controller.SettingsController.logger;


@RestController
@RequestMapping("/service-provider")
@CrossOrigin
public class ServiceProviderController {
    @Autowired
    private ServiceProviderService serviceProviderService;

    @Autowired
    private ProgramService courseService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        ServiceProvider serviceProvider = serviceProviderService.loginServiceProviderLogin(loginRequest.getUsername(), loginRequest.getPassword());

        if (serviceProvider != null) {
            serviceProviderService.LoginSendOtp(serviceProvider.getEmail(), serviceProvider.getUsername());
            return ResponseEntity.ok("OTP sent to registered email");
        } else {
            return ResponseEntity.status(401).body("Username or password is incorrect");
        }
    }

 /*   @PostMapping("/verify-otp")
    public ResponseEntity<LoginResponse> verifyOtp(@RequestBody OtpRequest otpRequest) {
        try {

            ServiceProvider serviceProvider = serviceProviderService.LoginVerifyOtp(otpRequest.getOtp(), otpRequest.getUsername());
            String serviceProviderId = String.valueOf(serviceProvider.getId());

            return ResponseEntity.ok(new LoginResponse("OTP verification successful!",serviceProviderId));
        } catch (Exception e) {
            return ResponseEntity.status(400).body( new LoginResponse(e.getMessage(),null) );
        }
    }
*/

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody OtpRequest otpRequest) {
        ServiceProvider serviceProvider = serviceProviderService.LoginVerifyOtp(otpRequest.getOtp(), otpRequest.getUsername());
        //String serviceProviderId = String.valueOf(serviceProvider.getId());


        try {
            if (serviceProvider != null) {
                SecureRandom secureRandom = new SecureRandom();
                byte[] key = new byte[32]; // 32 bytes = 256 bits
                secureRandom.nextBytes(key);
                String base64Key = Base64.getEncoder().encodeToString(key);

                // Create JWT Token using the secret key
                String token = Jwts.builder()
                        .setSubject(serviceProvider.getName())
                        .claim("id", serviceProvider.getId())// Add ID to the token
                        .claim("username", serviceProvider.getUsername()) // Add Username to the token
                        .claim("servType", serviceProvider.getServiceType())
                        .setIssuedAt(new Date())
                        .setExpiration(new Date(System.currentTimeMillis() + 3600000)) // 1 hour expiration
                        .signWith(SignatureAlgorithm.HS256, base64Key)
                        .compact();

                // Return token in response
                return ResponseEntity.ok(Map.of("token", token));
            } else {
                return ResponseEntity.ok("OTP verification failed!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while loging in" +e);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<ServiceProvider> getServiceProviderById(@PathVariable int id) {
        try {
            ServiceProvider serviceProvider = serviceProviderService.getServiceProviderDetailsById(id);
            return ResponseEntity.ok(serviceProvider);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/updateProfile/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable int id, @RequestBody ServiceProvider updatedServiceProvider) {
        try {
            ServiceProvider existingServiceProvider = serviceProviderService.getServiceProviderDetailsById(id);

            if (existingServiceProvider != null) {
                // Check if the username or email has changed
                if (!existingServiceProvider.getUsername().equals(updatedServiceProvider.getUsername())) {
                    // Check if the new username is unique
                    if (serviceProviderService.ifUsernameExists(updatedServiceProvider.getUsername())) {
                        return ResponseEntity.ok("Username already exists!");
                    }
                }

                if (!existingServiceProvider.getEmail().equals(updatedServiceProvider.getEmail())) {
                    // Check if the new email is unique
                    if (serviceProviderService.ifEmailExists(updatedServiceProvider.getEmail())) {
                        return ResponseEntity.ok("Email already exists!");
                    }
                }

                // Update the service provider details
                existingServiceProvider.setName(updatedServiceProvider.getName());
                existingServiceProvider.setUsername(updatedServiceProvider.getUsername());
                existingServiceProvider.setEmail(updatedServiceProvider.getEmail());
                existingServiceProvider.setServiceType(updatedServiceProvider.getServiceType());
                existingServiceProvider.setServiceProviderDescription(updatedServiceProvider.getServiceProviderDescription());

                serviceProviderService.saveServiceProvider(existingServiceProvider);
                return ResponseEntity.ok("Profile updated successfully");
            } else {
                return ResponseEntity.status(404).body("Service Provider not found!");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the profile");
        }
    }

    @PostMapping("/addService")
    public ResponseEntity<String> addService(@RequestParam("image") List<String> imageUrl,
                                             @RequestParam("name") String name,
                                             @RequestParam("price") String price,
                                             @RequestParam("location") String location,
                                             @RequestParam("type") String type,
                                             @RequestParam("details") String details,
                                             @RequestParam("paymentRefund") String paymentRefund,
                                             @RequestParam("contactNumber") String contactNumber,
                                             @RequestParam("email") String email,
                                             @RequestParam("servProvider") int servProvider,

                                             // CourseProgram fields
                                             @RequestParam(required = false) String duration,
                                             @RequestParam(required = false) String educationalFocus,
                                             @RequestParam(required = false) String learningOutcome,
                                             @RequestParam(required = false) Integer participants,
                                             @RequestParam(required = false) String prerequisites,
                                             @RequestParam(required = false) String courseStartDate,
                                             @RequestParam(required = false) String courseEndDate,
                                             @RequestParam(required = false) String courseLevel,
                                             @RequestParam(required = false) String courseCategory,
                                             @RequestParam(required = false) String courseAttendance,
                                             @RequestParam(required = false) String instructorName,
                                             @RequestParam(required = false) Boolean isCertified,
                                             // HotelProgram fields
                                             @RequestParam(required = false) String checkInDate,
                                             @RequestParam(required = false) String checkOutDate,
                                             @RequestParam(required = false) Integer rooms,
                                             @RequestParam(required = false) Integer luxRoomPrice,
                                             @RequestParam(required = false) Integer normalRoomPrice,
                                             @RequestParam(required = false) Integer availableLuxRooms,
                                             @RequestParam(required = false) Integer availableNormalRooms,

                                             @RequestParam(required = false) Integer luxTripleRoomPrice,
                                             @RequestParam(required = false) Integer familyRoomPrice,
                                             @RequestParam(required = false) Integer availableLuxTripleRooms,
                                             @RequestParam(required = false) Integer availableFamilyRooms,

                                             @RequestParam(required = false) Boolean hasParking,
                                             @RequestParam(required = false) Boolean hasBreakfastIncluded,
                                             @RequestParam(required = false) Boolean isAllInclusive,
                                             @RequestParam(required = false) String checkInTime,
                                             @RequestParam(required = false) String checkOutTime,
                                             @RequestParam(required = false) String hotelWeblink,
                                             // TravelLocationProgram fields
                                             @RequestParam(required = false) String travelDate,
                                             @RequestParam(required = false) Integer travelers,
                                             @RequestParam(required = false) String travelType,
                                             @RequestParam(required = false) String destination,
                                             @RequestParam(required = false) String guideName,
                                             // PackageProgram fields
                                             @RequestParam(required = false) String startDate,
                                             @RequestParam(required = false) String endDate,
                                             @RequestParam(required = false) String packageType,
                                             @RequestParam(required = false) String packageLocations,
                                             @RequestParam(required = false) String accommodationType,
                                             @RequestParam(required = false) Integer participantsPackage,
                                             // TransportProgram fields
                                             @RequestParam(required = false) String transportType,
                                             @RequestParam(required = false) String vehicleType,
                                             @RequestParam(required = false) Integer unitPrice,
                                             @RequestParam(required = false) Integer maxPassengers,

                                             // EventProgram fields
                                             @RequestParam(required = false) String eventName,
                                             @RequestParam(required = false) String eventDate,
                                             @RequestParam(required = false) String eventStartTime,
                                             @RequestParam(required = false) Integer attendees,
                                             @RequestParam(required = false) String venue,
                                             @RequestParam(required = false) String eventHost
    ) {
        logger.info("Starting to add a program of type: {}", type);

        try {
            Program program;

            ServiceProvider servProviderObj = serviceProviderService.getServiceProviderDetailsById(servProvider);

            // Handle program creation based on type
            switch (type) {
                case "Course":
                    logger.info("Creating a CourseProgram");
                    CourseProgram courseProgram = new CourseProgram();
                    if (duration == null || participants == null) {
                        throw new IllegalArgumentException("CourseProgram requires 'duration' and 'participants'.");
                    }
                    courseProgram.setDuration(duration);
                    courseProgram.setEducationalFocus(educationalFocus);
                    courseProgram.setLearningOutcome(learningOutcome);
                    courseProgram.setParticipants(participants);
                    courseProgram.setPrerequisites(prerequisites);
                    courseProgram.setCourseStartDate(courseStartDate);
                    courseProgram.setCourseEndDate(courseEndDate);
                    courseProgram.setCourseLevel(courseLevel);
                    courseProgram.setCourseCategory(courseCategory);
                    courseProgram.setCourseAttendance(courseAttendance);
                    courseProgram.setInstructorName(instructorName);
                    courseProgram.setCertified(isCertified);
                    courseProgram.setServiceProvider(servProviderObj);
                    program = courseProgram;
                    break;

                case "Hotel":
                    logger.info("Creating a HotelProgram");
                    HotelProgram hotelProgram = new HotelProgram();
                  /*  if (checkInDate == null || checkOutDate == null || rooms == null) {
                        throw new IllegalArgumentException("HotelProgram requires 'checkInDate', 'checkOutDate', and 'rooms'.");
                    }*/

                    hotelProgram.setLuxRoomPrice(luxRoomPrice);
                    hotelProgram.setNormalRoomPrice(normalRoomPrice);
                    hotelProgram.setAvailableLuxRooms(availableLuxRooms);
                    hotelProgram.setAvailableNormalRooms(availableNormalRooms);


                    hotelProgram.setLuxTripleRoomPrice(luxTripleRoomPrice);
                    hotelProgram.setFamilyRoomPrice(familyRoomPrice);
                    hotelProgram.setAvailableLuxTripleRooms(availableLuxTripleRooms);
                    hotelProgram.setAvailableFamilyRooms(availableFamilyRooms);

                    hotelProgram.setHasParking(hasParking);
                    hotelProgram.setHasBreakfastIncluded(hasBreakfastIncluded);
                    hotelProgram.setHotelWeblink(hotelWeblink);
                    hotelProgram.setCheckInTime(checkInTime);
                    hotelProgram.setCheckOutTime(checkOutTime);
                    hotelProgram.setServiceProvider(servProviderObj);
                    program = hotelProgram;
                    break;

                case "TravelLocation":
                    TravelLocationProgram travelLocationProgram = new TravelLocationProgram();
                    if (travelDate == null || travelers == null) {
                        throw new IllegalArgumentException("TravelLocationProgram requires 'travelDate' and 'travelers'.");
                    }
                    travelLocationProgram.setTravelDate(travelDate);
                    travelLocationProgram.setTravelers(travelers);
                    travelLocationProgram.setTravelType(travelType);
                    travelLocationProgram.setDestination(destination);
                    travelLocationProgram.setGuideName(guideName);
                    travelLocationProgram.setServiceProvider(servProviderObj);
                    program = travelLocationProgram;
                    break;

                case "Package":
                    PackageProgram packageProgram = new PackageProgram();
                    if (startDate == null || participantsPackage == null) {
                        throw new IllegalArgumentException("PackageProgram requires 'startDate' and 'participants'.");
                    }
                    packageProgram.setStartDate(startDate);
                    packageProgram.setEndDate(endDate);
                    packageProgram.setPackageType(packageType);
                    packageProgram.setPackageLocations(packageLocations);
                    packageProgram.setParticipants(participantsPackage);
                    // packageProgram.setAccommodationType(accommodationType);
                    packageProgram.setServiceProvider(servProviderObj);
                    program = packageProgram;
                    break;

                case "Transport":
                    TransportProgram transportProgram = new TransportProgram();

                    transportProgram.setTransportType(transportType);
                    transportProgram.setVehicleType(vehicleType);
                    transportProgram.setUnitPrice(unitPrice);
                    transportProgram.setMaxPassengers(maxPassengers);
                    /*    transportProgram.setSelfDrive(isSelfDrive);
                transportProgram.setPickupTime(pickupTime);
                    transportProgram.setPickupLocation(pickupLocation);
                    transportProgram.setDropoffLocation(dropoffLocation);
                    transportProgram.setPassengers(passengers);*/
                    transportProgram.setServiceProvider(servProviderObj);
                    program = transportProgram;
                    break;

                case "Event":
                    EventProgram eventProgram = new EventProgram();
                    if (eventName == null || eventDate == null || eventStartTime == null || attendees == null) {
                        throw new IllegalArgumentException("EventProgram requires 'eventName', 'eventDate', 'eventStartTime', and 'attendees'.");
                    }
                    eventProgram.setEventName(eventName);
                    eventProgram.setEventDate(eventDate);
                    eventProgram.setEventStartTime(eventStartTime);
                    eventProgram.setAttendees(attendees);
                    eventProgram.setVenue(venue);
                    eventProgram.setEventHost(eventHost);
                    eventProgram.setServiceProvider(servProviderObj);
                    program = eventProgram;
                    break;

                default:
                    throw new IllegalArgumentException("Unknown program type: " + type);
            }


            // Set common fields for all program types
            logger.info("Setting common fields for all program types");
            //program.setId(generateUniqueId()); // Assume generateUniqueId() is a method to generate unique IDs
            program.setTitle(name);
            program.setPrice(price);
            program.setLocation(location);
            program.setImages(imageUrl); // Assume convertToThumbnailLink() processes the image URL
            program.setType(type);
            program.setDetails(details);
            program.setRatings(0);

            program.setPaymentRefund(paymentRefund);
            program.setContactNumber(contactNumber);
            program.setEmail(email);
            program.setNumBookings(0);
            program.setServiceProviderIdCode(servProvider);

            // Save the program in the appropriate repository
            logger.info("Saving the program");
            courseService.saveCourse(program); // Adjust your service method as needed

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error adding program: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/updateService")
    public ResponseEntity<String> updateService(@RequestBody ServiceData service) {
//        try {
//            // Course program = new Course();
//            Course program =courseService.getCourseById(service.postId);
//
//            program.setName(service.title);
//            program.setPrice(service.price);
//            program.setLocation(service.location);
//            program.setStandard(service.standard);
//            program.setEducationalFocus(service.educationalFocus);
//            program.setEventDuration(service.eventDuration);
//            program.setLearningOutcome(service.learningOutcome);
//            program.setImage(service.image);
//            program.setServiceProviderIdCode(service.getServiceProvider());
//
//            courseService.saveCourse(program);
//            //  ServiceProvider serviceProvider = serviceProviderService.getServiceProviderDetailsById(service.getServiceProviderId());
//            System.out.println(program.getId());
//
//            // serviceProvider.addToPostIdList(program.getId());
//
//            return ResponseEntity.ok("ok");
//        } catch (Exception e) {
//            return ResponseEntity.status(500).body("An error occurred while updating the service"+ e.getMessage());
//        }
        return null;
    }

    static class LoginRequest {
        private String username;
        private String password;

        // Getters and setters
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
    }

    static class OtpRequest {
        private String otp;
        private String username;

        // Getters and setters
        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }
    }

    static class LoginResponse {
        private String message;
        private String id;

        public LoginResponse(String message, String id) {
            this.message = message;
            this.id = id;
        }

        // Getters and setters
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }
    }

    public static class ServiceData {
        private String title;
        private String price;
        private String standard;
        private String location;
        private String image;
        private String educationalFocus;
        private String learningOutcome;
        private String eventDuration;
        private int serviceProviderId;
        private int postId;


        // Getters and Setters

        public int getPostId() {
            return postId;
        }

        public void setPostId(int postId) {
            this.postId = postId;
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

        public String getStandard() {
            return standard;
        }

        public void setStandard(String standard) {
            this.standard = standard;
        }

        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }

        public String getImage() {
            return image;
        }

        public void setImage(String image) {
            this.image = image;
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

        public String getEventDuration() {
            return eventDuration;
        }

        public void setEventDuration(String eventDuration) {
            this.eventDuration = eventDuration;
        }

        public int getServiceProvider() {
            System.out.println("Returning serviceProviderId: " + serviceProviderId);
            return this.serviceProviderId; }

        public void setServiceProvider(int serviceProviderId) { this.serviceProviderId = serviceProviderId; }
    }


}
