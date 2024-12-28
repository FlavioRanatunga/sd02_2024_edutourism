package com.EduExplore.System.controller;

import com.EduExplore.System.model.*;
import com.EduExplore.System.repository.CourseLogRepository;
import com.EduExplore.System.repository.HotelProgramRepository;
import com.EduExplore.System.repository.ProgramRepository;
import com.EduExplore.System.service.ProgramService;
import com.EduExplore.System.service.TravellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.EduExplore.System.controller.SettingsController.logger;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin
public class ProgramController {

    @Autowired
    private ProgramService programService;

    @Autowired
    private ProgramRepository programRepository;
    @Autowired
    private TravellerService travellerService;

    @Autowired
    private HotelProgramRepository hotelProgramRepository;

    @Autowired
    private CourseLogRepository courseLogRepository;

    @PostMapping("/filter")
    public List<CourseDto> getFilteredCourses(@RequestBody FilterCriteria filterCriteria) {
        List<Program> cours = programService.getFilteredCourses(
                filterCriteria.getSearch(),
                filterCriteria.getPriceRange(),

                filterCriteria.getLocation()

        );

        return cours.stream().map(course -> {
            CourseDto dto = new CourseDto();
            dto.setId(course.getId()); // Add this line
            dto.setTitle(course.getTitle());
            dto.setPrice(course.getPrice());
            dto.setType(course.getType());

       //     System.out.println(course.getType());
 if(course.getType().equals("Hotel"))
 {
     HotelProgram temp = hotelProgramRepository.getReferenceById(course.getId());
    // System.out.println(course.getType());

     dto.setFamilyRoomPrice(temp.getFamilyRoomPrice());
     dto.setLuxTripleRoomPrice(temp.getLuxTripleRoomPrice());
     dto.setNormalRoomPrice(temp.getNormalRoomPrice());
     dto.setLuxRoomPrice(temp.getLuxRoomPrice());
 }
            dto.setLocation(course.getLocation());
            dto.setImage(course.getImages());

            return dto;
        }).collect(Collectors.toList());
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addProgram(
            @RequestParam("image") List<String> imageUrl,
            @RequestParam("name") String name,
            @RequestParam("price") String price,
            @RequestParam("location") String location,
            @RequestParam("type") String type,
            @RequestParam("details") String details,
            @RequestParam("ratings") int ratings,
            @RequestParam("reviews") String reviews,
            @RequestParam("paymentRefund") String paymentRefund,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("email") String email,
            @RequestParam("numBookings") int numBookings,
            // CourseProgram fields
            @RequestParam(required = false) String duration,
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
            @RequestParam(required = false) Boolean isSelfDrive,
            @RequestParam(required = false) String pickupTime,
            @RequestParam(required = false) String pickupLocation,
            @RequestParam(required = false) String dropoffLocation,
            @RequestParam(required = false) Integer passengers,
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

            // Handle program creation based on type
            switch (type) {
                case "Course":
                    logger.info("Creating a CourseProgram");
                    CourseProgram courseProgram = new CourseProgram();
                    if (duration == null || participants == null) {
                        throw new IllegalArgumentException("CourseProgram requires 'duration' and 'participants'.");
                    }
                    courseProgram.setDuration(duration);
                    courseProgram.setParticipants(participants);
                    courseProgram.setPrerequisites(prerequisites);
                    courseProgram.setCourseStartDate(courseStartDate);
                    courseProgram.setCourseEndDate(courseEndDate);
                    courseProgram.setCourseLevel(courseLevel);
                    courseProgram.setCourseCategory(courseCategory);
                    courseProgram.setCourseAttendance(courseAttendance);
                    courseProgram.setInstructorName(instructorName);
                    courseProgram.setCertified(isCertified);
                    program = courseProgram;
                    break;

                case "Hotel":
                    logger.info("Creating a HotelProgram");
                    HotelProgram hotelProgram = new HotelProgram();
                    if (checkInDate == null || checkOutDate == null || rooms == null) {
                        throw new IllegalArgumentException("HotelProgram requires 'checkInDate', 'checkOutDate', and 'rooms'.");
                    }
                    hotelProgram.setCheckInDate(checkInDate);
                    hotelProgram.setCheckOutDate(checkOutDate);
                    hotelProgram.setRooms(rooms);
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
                    hotelProgram.setAllInclusive(isAllInclusive);
                    hotelProgram.setCheckInTime(checkInTime);
                    hotelProgram.setCheckOutTime(checkOutTime);
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
                    packageProgram.setAccommodationType(accommodationType);
                    program = packageProgram;
                    break;

                case "Transport":
                    TransportProgram transportProgram = new TransportProgram();
                    if (pickupLocation == null || dropoffLocation == null || passengers == null) {
                        throw new IllegalArgumentException("TransportProgram requires 'pickupLocation', 'dropoffLocation', and 'passengers'.");
                    }
                    transportProgram.setTransportType(transportType);
                    transportProgram.setVehicleType(vehicleType);
                    transportProgram.setUnitPrice(unitPrice);
                    transportProgram.setMaxPassengers(maxPassengers);
                    transportProgram.setSelfDrive(isSelfDrive);
                    transportProgram.setPickupTime(pickupTime);
                    transportProgram.setPickupLocation(pickupLocation);
                    transportProgram.setDropoffLocation(dropoffLocation);
                    transportProgram.setPassengers(passengers);
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
            program.setRatings(ratings);
            program.setReviews(reviews);
            program.setPaymentRefund(paymentRefund);
            program.setContactNumber(contactNumber);
            program.setEmail(email);
            program.setNumBookings(numBookings);

            // Save the program in the appropriate repository
            logger.info("Saving the program");
            programService.saveCourse(program); // Adjust your service method as needed

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            logger.error("Error adding program: ", e);
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCourseById(@PathVariable int id) {
        programService.deleteCourseById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getProgramById(@PathVariable int id) {
        // Retrieve the Program object by ID
        Program program = programService.getCourseById(id);

        // Check if the program exists
        if (program == null) {
            return ResponseEntity.notFound().build();
        }

        // Create a new CourseDto to return data
        CourseDto dto = new CourseDto();

        // Set common fields
        dto.setId(program.getId());
        dto.setTitle(program.getTitle());
        dto.setPrice(program.getPrice());
        dto.setLocation(program.getLocation());
        dto.setImage(program.getImages());
        dto.setType(program.getType());
        dto.setDetails(program.getDetails());
        dto.setRatings(program.getRatings());
        dto.setReviews(program.getReviews());
        dto.setPaymentRefund(program.getPaymentRefund());
        dto.setContactNumber(program.getContactNumber());
        dto.setEmail(program.getEmail());
        dto.setNumBookings(program.getNumBookings());

        // Check the type of the program and populate specific fields
        switch (program.getType()) {
            case "Course":
                CourseProgram courseProgram = (CourseProgram) program;
                dto.setDuration(courseProgram.getDuration());
                dto.setParticipants(courseProgram.getParticipants());
                dto.setPrerequisites(courseProgram.getPrerequisites());
                dto.setCourseStartDate(courseProgram.getCourseStartDate());
                dto.setCourseEndDate(courseProgram.getCourseEndDate());
                dto.setCourseLevel(courseProgram.getCourseLevel());
                dto.setCourseCategory(courseProgram.getCourseCategory());
                dto.setCourseAttendance(courseProgram.getCourseAttendance());
                dto.setInstructorName(courseProgram.getInstructorName());
                dto.setCertified(courseProgram.isCertified());
                break;

            case "Hotel":
                HotelProgram hotelProgram = (HotelProgram) program;
                dto.setLuxRoomPrice(hotelProgram.getLuxRoomPrice());
                dto.setNormalRoomPrice(hotelProgram.getNormalRoomPrice());
                dto.setAvailableLuxRooms(hotelProgram.getAvailableLuxRooms());
                dto.setAvailableNormalRooms(hotelProgram.getAvailableNormalRooms());
                dto.setHasParking(hotelProgram.isHasParking());
                dto.setHasBreakfastIncluded(hotelProgram.isHasBreakfastIncluded());
                dto.setAllInclusive(hotelProgram.isAllInclusive());
                dto.setCheckInTime(hotelProgram.getCheckInTime());
                dto.setCheckOutTime(hotelProgram.getCheckOutTime());
                break;

            case "TravelLocation":
                TravelLocationProgram travelLocationProgram = (TravelLocationProgram) program;
                dto.setTravelDate(travelLocationProgram.getTravelDate());
                dto.setTravelers(travelLocationProgram.getTravelers());
                dto.setGuideName(travelLocationProgram.getGuideName());
                break;

            case "Package":
                PackageProgram packageProgram = (PackageProgram) program;
                dto.setStartDate(packageProgram.getStartDate());
                dto.setEndDate(packageProgram.getEndDate());
                dto.setPackageType(packageProgram.getPackageType());
                dto.setPackageLocations(packageProgram.getPackageLocations());
                break;

            case "Transport":
                TransportProgram transportProgram = (TransportProgram) program;
                dto.setTransportType(transportProgram.getTransportType());
                dto.setVehicleType(transportProgram.getVehicleType());
                dto.setUnitPrice(transportProgram.getUnitPrice());
                dto.setMaxPassengers(transportProgram.getMaxPassengers());
                dto.setSelfDrive(transportProgram.isSelfDrive());
                break;

            case "Event":
                EventProgram eventProgram = (EventProgram) program;
                dto.setEventDate(eventProgram.getEventDate());
                dto.setStartTime(eventProgram.getStartTime());
                dto.setAttendees(eventProgram.getAttendees());
                dto.setVenue(eventProgram.getVenue());
                dto.setEventHost(eventProgram.getEventHost());
                break;

            default:
                return ResponseEntity.badRequest().build();
        }

        // Return the populated DTO
        return ResponseEntity.ok(dto);
    }


    // Method to notify the service provider
    @PostMapping("/notify/{id}")
    public ResponseEntity<String> notifyServiceProvider(@PathVariable int id) {
        System.out.println("In the notify controller");
        // Fetch the program by ID
        Optional<Program> programOptional = programRepository.findById(id);
        if (!programOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Program not found with ID: " + id);
        }

        Program program = programOptional.get();

        // Call the service to send the notification
        programService.notifyServiceProvider(program);

        // Return success response
        return ResponseEntity.ok("Notification sent to service provider for program ID: " + id);
    }


    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<Program> cours = programService.getAllCourses();
        List<CourseDto> courseDtos = cours.stream().map(course -> {
            CourseDto dto = new CourseDto();
            dto.setId(course.getId()); // Add this line
            dto.setTitle(course.getTitle());
            dto.setPrice(course.getPrice());

            dto.setLocation(course.getLocation());
            dto.setImage(course.getImages());

            return dto;
        }).collect(Collectors.toList());
        return ResponseEntity.ok(courseDtos);
    }


    @PutMapping("/update-image/{id}")
    public ResponseEntity<Void> updateCourseImage(@PathVariable int id, @RequestParam("image") String imageUrl) {
        String thumbnailImageUrl = convertToThumbnailLink(imageUrl);
        programService.updateCourseImage(id, thumbnailImageUrl);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/updateViewCount")
    public ResponseEntity<Void> updateViewCount(@PathVariable int id) {
        try {
            programService.incrementClickCount(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    private String convertToThumbnailLink(String link) {
        String fileId = link.split("/d/")[1].split("/")[0];
        return "https://drive.google.com/thumbnail?id=" + fileId;
    }
    @GetMapping("/listingcount")
    public ResponseEntity<Map<String, String>> getListingsCount() {
        long coursesCount = programRepository.countByType("Course");
        long travelLocationCount = programRepository.countByType("travelLocationCount");
        long hotelsCount = programRepository.countByType("Hotel");
        long packagesCount = programRepository.countByType("Package");
        long eventCount = programRepository.countByType("Event");

        Map<String, String> counts = new HashMap<>();
        counts.put("Courses", String.valueOf(coursesCount));
        counts.put("TravelLocations", String.valueOf(travelLocationCount));
        counts.put("Hotels", String.valueOf(hotelsCount));
        counts.put("Packages", String.valueOf(packagesCount));
        counts.put("Events", String.valueOf(eventCount));

        return ResponseEntity.ok(counts);
    }
    @GetMapping("/personalizedSuggestions")
    public ResponseEntity<List<String>> getPersonalizedSuggestions(@RequestParam int travellerId, @RequestParam String searchString) {
        //System.out.println("Traveller ID: " + travellerId + ", Search String: " + searchString); // Logging the input
        List<String> suggestions = travellerService.getPersonalizedSuggestions(travellerId, searchString);
        //System.out.println("Suggestions: " + suggestions); // Logging the suggestions
        return ResponseEntity.ok(suggestions);
    }

    @PostMapping("/getServiceProvidersPosts/{serviceProviderId}")
    public List<CourseDto> getCoursesByServiceProviderId(@PathVariable int serviceProviderId) {

        List<Program> cours = programService.getCoursesByServiceProviderId(serviceProviderId);

        return cours.stream().map(course -> {
            CourseDto dto = new CourseDto();
            dto.setId(course.getId()); // Add this line
            dto.setTitle(course.getTitle());
            dto.setPrice(course.getPrice());

            dto.setLocation(course.getLocation());
            dto.setImage(course.getImages());

            return dto;
        }).collect(Collectors.toList());
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<String> approveCourse(@PathVariable int id) {
        try {
            programService.approveCourse(id);
            CourseLog log = new CourseLog();
            log.setAction("APPROVE");
            log.setCourseId((long) id); // Ensure ID is of type Long
            log.setDetails("Course with ID " + id + " has been approved.");
            log.setTimestamp(LocalDateTime.now());
            courseLogRepository.save(log);

            return ResponseEntity.ok("Course approved successfully!");
        } catch (Exception e) {
            // Log the error for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred while approving the course: " + e.getMessage());
        }
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<String> editService(@PathVariable int id, @RequestBody Program updatedProgram) {
        try {
            programService.updateCourse(id, updatedProgram);
            CourseLog log = new CourseLog();
            log.setAction("EDIT");
            log.setCourseId((long) id); // Ensure ID is of type Long
            log.setDetails("Course with ID " + id + " has been updated. New details: " + updatedProgram.toString());
            log.setTimestamp(LocalDateTime.now());
            courseLogRepository.save(log);

            return ResponseEntity.ok("Service updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while updating the service. " + e.getMessage());
        }
    }

    @GetMapping("/review/{id}")
    public ResponseEntity<Program> reviewService(@PathVariable int id) {
        try {
            Program program = programService.getCourseById(id);
            return ResponseEntity.ok(program);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Test endpoint is working!");
    }

    static class FilterCriteria {
        private String search;
        private String priceRange;

        private String location;



        private  String type;


        // Getters and Setters
        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
        public String getSearch() {
            return search;
        }

        public void setSearch(String search) {
            this.search = search;
        }

        public String getPriceRange() {
            return priceRange;
        }

        public void setPriceRange(String priceRange) {
            this.priceRange = priceRange;
        }




        public String getLocation() {
            return location;
        }

        public void setLocation(String location) {
            this.location = location;
        }


    }





}
