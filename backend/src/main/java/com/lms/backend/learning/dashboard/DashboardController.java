package com.lms.backend.learning.dashboard;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.course.dto.CourseResponse;
import com.lms.backend.learning.dashboard.dto.DashboardStatsResponse;
import com.lms.backend.learning.dashboard.dto.EnrollmentAnalyticsResponse;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStatsResponse>> getStats() {

        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Dashboard stats fetched successfully",
                service.getDashboardStats(),
                200
            )
        );
    }
    @GetMapping("/recent-courses")
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getRecentCourses() {

        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Recent courses fetched successfully",
                service.getRecentCourses(),
                200
            )
        );
    }
   @GetMapping("/analytics/enrollments")
    public ResponseEntity<ApiResponse<List<EnrollmentAnalyticsResponse>>> getEnrollmentAnalytics(
        @RequestParam(defaultValue = "Monthly") String period) {

    return ResponseEntity.ok(
        ResponseBuilder.success(
            "Enrollment analytics fetched successfully",
            service.getEnrollmentAnalytics(period),
            200
        )
    );
    }
}
