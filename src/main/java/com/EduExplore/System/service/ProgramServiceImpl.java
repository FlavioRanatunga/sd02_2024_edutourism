package com.EduExplore.System.service;

import com.EduExplore.System.model.*;
import com.EduExplore.System.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramServiceImpl implements ProgramService {

    private static final Logger logger = LoggerFactory.getLogger(ProgramServiceImpl.class);

    @Autowired
    private ProgramRepository programRepository;



    @Autowired
    private CourseProgramRepository courseProgramRepository;

    @Autowired
    private HotelProgramRepository hotelProgramRepository;

    @Autowired
    private TravelLocationProgramRepository travelLocationProgramRepository;

    @Autowired
    private PackageProgramRepository packageProgramRepository;

    @Autowired
    private TransportProgramRepository transportProgramRepository;

    @Autowired
    private EventProgramRepository eventProgramRepository;

    @Override
    public List<Program> getFilteredCourses(String search, String priceRange,  String location) {
        return programRepository.findAll().stream()
                .filter(course -> (search == null || course.getTitle().toLowerCase().contains(search.toLowerCase())))
                .filter(course -> (priceRange == null || course.getPrice().toLowerCase().contains(priceRange.toLowerCase())))

                .filter(course -> (location == null || course.getLocation().toLowerCase().contains(location.toLowerCase())))

                .toList();
    }

    @Override
    public void saveCourse(Program program) {

        // Handle saving logic based on the specific subclass of Program
        if (program instanceof CourseProgram) {
            CourseProgram courseProgram = (CourseProgram) program;
            courseProgramRepository.save(courseProgram);
        } else if (program instanceof HotelProgram) {
            HotelProgram hotelProgram = (HotelProgram) program;
            hotelProgramRepository.save(hotelProgram);
        } else if (program instanceof TravelLocationProgram) {
            TravelLocationProgram travelLocationProgram = (TravelLocationProgram) program;
            travelLocationProgramRepository.save(travelLocationProgram);
        } else if (program instanceof PackageProgram) {
            PackageProgram packageProgram = (PackageProgram) program;
            packageProgramRepository.save(packageProgram);
        } else if (program instanceof TransportProgram) {
            TransportProgram transportProgram = (TransportProgram) program;
            transportProgramRepository.save(transportProgram);
        } else if (program instanceof EventProgram) {
            EventProgram eventProgram = (EventProgram) program;
            eventProgramRepository.save(eventProgram);
        } else {
            // Handle default or throw an exception if the type is unrecognized
            throw new IllegalArgumentException("Unknown program type: " + program.getType());
        }

        // Optionally save the program in the base Program repository if needed
        programRepository.save(program);
    }

    @Override
    public void deleteCourseById(int id) {
        programRepository.deleteById(id);
    }

    @Override
    public Program getCourseById(int id) {
        Optional<Program> programOpt = programRepository.findById(id);
        if (!programOpt.isPresent()) {
            throw new RuntimeException("Program not found");
        }

        Program program = programOpt.get();

        // Identify the program type and cast it accordingly
        if (program instanceof CourseProgram) {
            return (CourseProgram) program;
        } else if (program instanceof HotelProgram) {
            return (HotelProgram) program;
        } else if (program instanceof TravelLocationProgram) {
            return (TravelLocationProgram) program;
        } else if (program instanceof PackageProgram) {
            return (PackageProgram) program;
        } else if (program instanceof TransportProgram) {
            return (TransportProgram) program;
        } else if (program instanceof EventProgram) {
            return (EventProgram) program;
        }

        return program;  // Default case (though it should never reach here)

    }

    @Override
    public List<Program> getAllCourses() {
        return programRepository.findAll();
    }

    @Override
    public void updateCourseImage(int id, String imageUrl) {
        Optional<Program> optionalCourse = programRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Program program = optionalCourse.get();
            //program.setImages(imageUrl); // Assuming the imageUrl is already the thumbnail URL
            programRepository.save(program);
        }
    }

    @Override
    public void incrementClickCount(int id) {
        Optional<Program> optionalCourse = programRepository.findById(id);
        if (optionalCourse.isPresent()) {
            Program program = optionalCourse.get();
            program.incrementClickCount();
            programRepository.save(program);
        }
    }

    @Override
    public List<Program> getCoursesByServiceProviderId(int serviceProviderId) {

        return  programRepository.findCourseByServiceProviderIdCode(serviceProviderId);
    }

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private ServiceProviderRepository serviceProviderRepository;

    @Override
    public void approveCourse(Integer id) {
        logger.info("Approving course with ID: {}", id);
        Program program = programRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        // Set the course as approved (if applicable)
        // For simplicity, assuming a boolean field 'approved' in Course entity
        program.setApproved(true);
        programRepository.save(program);
        logger.info("Course with ID: {} has been approved", id);

        // Notify the service provider
        notifyServiceProvider(program);
    }

    @Override
    public void updateCourse(Integer id, Program updatedProgram) {
        logger.info("Updating course with ID: {}", id);
        Program existingProgram = programRepository.findById(id).orElseThrow(() -> new RuntimeException("Course not found"));
        // Update the course details
        existingProgram.setTitle(updatedProgram.getTitle());
        existingProgram.setImages(updatedProgram.getImages());
        existingProgram.setLocation(updatedProgram.getLocation());
        existingProgram.setPrice(updatedProgram.getPrice());

        programRepository.save(existingProgram);

        // Notify the service provider
        logger.info("Course with ID {} updated by admin", id);
        notifyServiceProvider(existingProgram);
    }

    @Override
    public void notifyServiceProvider(Program program) {

        String email = program.getEmail(); // Implement this method to fetch email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Service Update Notification");
        message.setText("Your service with ID " + program.getId() + " has been updated.");
        logger.info("Notification sent to service provider with email {} regarding course ID {}", email, program.getId());
        javaMailSender.send(message);
    }


    private String getServiceProviderEmailByCourse(Program program) {
        ServiceProvider serviceProvider = program.getServiceProvider();
        if (serviceProvider != null) {
            return serviceProvider.getEmail();
        } else {
            throw new RuntimeException("Service provider not associated with the course.");
        }
    }
}
