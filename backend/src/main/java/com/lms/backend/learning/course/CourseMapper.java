package com.lms.backend.learning.course;

import org.springframework.stereotype.Component;

import com.lms.backend.learning.category.Category;
import com.lms.backend.learning.course.dto.CourseRequest;
import com.lms.backend.learning.course.dto.CourseResponse;

@Component
public class CourseMapper {

    public Course toEntity(CourseRequest request, Category category) {

        if (request == null) {
            return null;
        }

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnail(request.getThumbnail());
        course.setCurriculum(request.getCurriculum());
        course.setDifficulty(request.getDifficulty());
        course.setDuration(request.getDuration());
        course.setCategory(category);
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            course.setStatus(request.getStatus());
        }
        
        course.setSlug(request.getSlug());
        course.setLanguage(request.getLanguage() != null ? request.getLanguage() : "English");
        course.setTargetAudience(request.getTargetAudience());
        course.setHasCertificate(request.getHasCertificate() != null ? request.getHasCertificate() : false);
        course.setCurrency(request.getCurrency());
        course.setPrice(request.getPrice());
        course.setCourseCode(request.getCourseCode());
        course.setTeaserVideoUrl(request.getTeaserVideoUrl());
        course.setPrerequisites(request.getPrerequisites());
        course.setTakeaways(request.getTakeaways());

        return course;
    }

    public CourseResponse toResponse(Course course) {

        if (course == null) {
            return null;
        }

        return new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getThumbnail(),
                course.getCurriculum(),
                course.getDifficulty(),
                course.getDuration(),
                course.getCategory().getId(),
                course.getCategory().getName(),
                course.getStatus(),
                course.getSlug(),
                course.getLanguage(),
                course.getTargetAudience(),
                course.isHasCertificate(),
                course.getCurrency(),
                course.getPrice(),
                course.getCourseCode(),
                course.getTeaserVideoUrl(),
                course.getPrerequisites(),
                course.getTakeaways() != null ? new java.util.ArrayList<>(course.getTakeaways()) : null
        );
    }

    public void updateEntity(
            Course course,
            CourseRequest request,
            Category category) {

        course.setTitle(request.getTitle());
        course.setDescription(request.getDescription());
        course.setThumbnail(request.getThumbnail());
        course.setCurriculum(request.getCurriculum());
        course.setDifficulty(request.getDifficulty());
        course.setDuration(request.getDuration());
        course.setCategory(category);
        if (request.getStatus() != null && !request.getStatus().isBlank()) {
            course.setStatus(request.getStatus());
        }
        
        course.setSlug(request.getSlug());
        if (request.getLanguage() != null) {
            course.setLanguage(request.getLanguage());
        }
        course.setTargetAudience(request.getTargetAudience());
        if (request.getHasCertificate() != null) {
            course.setHasCertificate(request.getHasCertificate());
        }
        course.setCurrency(request.getCurrency());
        course.setPrice(request.getPrice());
        course.setCourseCode(request.getCourseCode());
        course.setTeaserVideoUrl(request.getTeaserVideoUrl());
        course.setPrerequisites(request.getPrerequisites());
        course.setTakeaways(request.getTakeaways());
    }
}