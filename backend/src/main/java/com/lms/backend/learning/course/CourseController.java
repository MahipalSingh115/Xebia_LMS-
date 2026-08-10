package com.lms.backend.learning.course;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.backend.common.response.ApiResponse;
import com.lms.backend.common.response.ResponseBuilder;
import com.lms.backend.learning.course.dto.CourseRequest;
import com.lms.backend.learning.course.dto.CourseResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
@Tag(name = "Course", description = "Course APIs")
public class CourseController {

    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @Operation(summary = "Get all courses")
    @GetMapping
    public ResponseEntity<ApiResponse<List<CourseResponse>>> getAllCourses() {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Courses fetched successfully",
                        service.getAllCourses(),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Get course by ID")
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> getCourseById(
            @PathVariable @NonNull Long id) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Course fetched successfully",
                        service.getCourseById(id),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Create course")
    @PostMapping
    public ResponseEntity<ApiResponse<CourseResponse>> createCourse(
            @Valid @RequestBody CourseRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ResponseBuilder.success(
                        "Course created successfully",
                        service.createCourse(request),
                        HttpStatus.CREATED.value()));
    }

    @Operation(summary = "Update course")
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<CourseResponse>> updateCourse(
            @PathVariable @NonNull Long id,
            @Valid @RequestBody CourseRequest request) {

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Course updated successfully",
                        service.updateCourse(id, request),
                        HttpStatus.OK.value()));
    }

    @Operation(summary = "Delete course")
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(
            @PathVariable @NonNull Long id) {

        service.deleteCourse(id);

        return ResponseEntity.ok(
                ResponseBuilder.success(
                        "Course deleted successfully",
                        null,
                        HttpStatus.OK.value()));
    }
}