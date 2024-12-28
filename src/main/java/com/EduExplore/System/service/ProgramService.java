package com.EduExplore.System.service;

import com.EduExplore.System.model.Program;

import java.util.List;

public interface ProgramService {
    public List<Program> getFilteredCourses(String search, String priceRange,  String location);
    public void saveCourse(Program program);

    void deleteCourseById(int id); // Add this line

    Program getCourseById(int id);

    public List<Program> getAllCourses();
    void updateCourseImage(int id, String imageUrl);

    void incrementClickCount(int id); // Add this line

    public List<Program> getCoursesByServiceProviderId(int serviceProviderId);

    void approveCourse(Integer id);
    void updateCourse(Integer id, Program updatedProgram);
    void notifyServiceProvider(Program program);

}
