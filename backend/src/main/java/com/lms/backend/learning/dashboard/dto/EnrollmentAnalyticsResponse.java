package com.lms.backend.learning.dashboard.dto;

public class EnrollmentAnalyticsResponse {

    private String month;
    private long enrollments;

    public EnrollmentAnalyticsResponse() {
    }

    public EnrollmentAnalyticsResponse(String month, long enrollments) {
        this.month = month;
        this.enrollments = enrollments;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getEnrollments() {
        return enrollments;
    }

    public void setEnrollments(long enrollments) {
        this.enrollments = enrollments;
    }
}