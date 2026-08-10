package com.lms.backend.learning.student;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.student.dto.CertificateResponse;
import com.lms.backend.learning.student.dto.GradeResponse;
import com.lms.backend.learning.student.dto.StudentAnalyticsResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/grades")
    public ResponseEntity<ApiResponse<List<GradeResponse>>> getGrades() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student grades fetched successfully",
                studentService.getGrades(),
                200
            )
        );
    }

    @GetMapping("/certificates")
    public ResponseEntity<ApiResponse<List<CertificateResponse>>> getCertificates() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student certificates fetched successfully",
                studentService.getCertificates(),
                200
            )
        );
    }

    @GetMapping("/analytics")
    public ResponseEntity<ApiResponse<StudentAnalyticsResponse>> getAnalytics() {
        return ResponseEntity.ok(
            ResponseBuilder.success(
                "Student analytics metrics fetched successfully",
                studentService.getAnalytics(),
                200
            )
        );
    }
}
