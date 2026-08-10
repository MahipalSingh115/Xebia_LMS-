package com.lms.backend.learning.dashboard.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {

    private long totalCategories;
    private long totalCourses;
    private long totalModules;
    private long totalSubmodules;
    private long totalContents;
    private long totalStudents;
    private long totalEnrollments;
    private long totalInstructors;

    // getters setters
}
