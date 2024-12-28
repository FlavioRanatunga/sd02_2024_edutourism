package com.EduExplore.System.model;

import jakarta.persistence.Entity;

@Entity
public class CourseProgram extends Program {

    // Course-specific fields
    private String duration;  // Duration of the course (e.g., 4 weeks)



    private String educationalFocus;

    private String learningOutcome;

    private String prerequisites;  // Prerequisites needed for the course
    private String courseStartDate;  // Start date of the course
    private String courseEndDate;  // End date of the course
    private String courseLevel;  // Difficulty level of the course (e.g., beginner, intermediate)
    private String courseCategory;  // Category of the course (e.g., technology, arts)
    private String courseAttendance;  // Attendance requirements (e.g., full-time, part-time)
    private int participants;  // Number of participants allowed
    private String instructorName;  // Name of the instructor
    private boolean isCertified;  // Whether a certificate is offered upon completion

    // Getters and Setters

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
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

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public String getCourseStartDate() {
        return courseStartDate;
    }

    public void setCourseStartDate(String courseStartDate) {
        this.courseStartDate = courseStartDate;
    }

    public String getCourseEndDate() {
        return courseEndDate;
    }

    public void setCourseEndDate(String courseEndDate) {
        this.courseEndDate = courseEndDate;
    }

    public String getCourseLevel() {
        return courseLevel;
    }

    public void setCourseLevel(String courseLevel) {
        this.courseLevel = courseLevel;
    }

    public String getCourseCategory() {
        return courseCategory;
    }

    public void setCourseCategory(String courseCategory) {
        this.courseCategory = courseCategory;
    }

    public String getCourseAttendance() {
        return courseAttendance;
    }

    public void setCourseAttendance(String courseAttendance) {
        this.courseAttendance = courseAttendance;
    }

    public int getParticipants() {
        return participants;
    }

    public void setParticipants(int participants) {
        this.participants = participants;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public boolean isCertified() {
        return isCertified;
    }

    public void setCertified(boolean isCertified) {
        this.isCertified = isCertified;
    }
}
