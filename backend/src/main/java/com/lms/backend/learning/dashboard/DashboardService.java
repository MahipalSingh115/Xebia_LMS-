package com.lms.backend.learning.dashboard;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lms.backend.learning.category.CategoryRepository;
import com.lms.backend.learning.content.ContentRepository;
import com.lms.backend.learning.course.CourseMapper;
import com.lms.backend.learning.course.CourseRepository;
import com.lms.backend.learning.course.dto.CourseResponse;
import com.lms.backend.learning.dashboard.dto.DashboardStatsResponse;
import com.lms.backend.learning.dashboard.dto.EnrollmentAnalyticsResponse;
import com.lms.backend.learning.module.ModuleRepository;
import com.lms.backend.learning.submodule.SubModuleRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DashboardService {
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final ModuleRepository moduleRepository;
    private final SubModuleRepository submoduleRepository;
    private final ContentRepository contentRepository;
    private final CourseMapper courseMapper;

    public DashboardStatsResponse getDashboardStats() {

        DashboardStatsResponse response = new DashboardStatsResponse();

        response.setTotalCategories(categoryRepository.count());
        response.setTotalCourses(courseRepository.count());
        response.setTotalModules(moduleRepository.count());
        response.setTotalSubmodules(submoduleRepository.count());
        response.setTotalContents(contentRepository.count());
        response.setTotalStudents(0);
        response.setTotalEnrollments(0);
        response.setTotalInstructors(0);

        return response;
    }
    public List<CourseResponse> getRecentCourses() {

    return courseRepository
            .findTop5ByOrderByIdDesc()
            .stream()
            .map(courseMapper::toResponse)
            .toList();
    }
    public List<EnrollmentAnalyticsResponse> getEnrollmentAnalytics(String period) {

    if ("Weekly".equalsIgnoreCase(period)) {

        return List.of(
            new EnrollmentAnalyticsResponse("Week 1", 35),
            new EnrollmentAnalyticsResponse("Week 2", 52),
            new EnrollmentAnalyticsResponse("Week 3", 41),
            new EnrollmentAnalyticsResponse("Week 4", 67)
        );
    }

    return List.of(
        new EnrollmentAnalyticsResponse("Jan", 20),
        new EnrollmentAnalyticsResponse("Feb", 35),
        new EnrollmentAnalyticsResponse("Mar", 28),
        new EnrollmentAnalyticsResponse("Apr", 42),
        new EnrollmentAnalyticsResponse("May", 50)
    );
}
}




