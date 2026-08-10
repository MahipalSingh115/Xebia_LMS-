package com.lms.backend.learning.course.dto;

import java.util.List;

public class CourseResponse {

    private Long id;
    private String title;
    private String description;
    private String thumbnail;
    private String curriculum;
    private String difficulty;
    private String duration;
    private Long categoryId;
    private String categoryName;
    private String status;

    private String slug;
    private String language;
    private String targetAudience;
    private boolean hasCertificate;
    private String currency;
    private String price;
    private String courseCode;
    private String teaserVideoUrl;
    private String prerequisites;
    private List<String> takeaways;

    public CourseResponse() {
    }

    public CourseResponse(
            Long id,
            String title,
            String description,
            String thumbnail,
            String curriculum,
            String difficulty,
            String duration,
            Long categoryId,
            String categoryName,
            String status,
            String slug,
            String language,
            String targetAudience,
            boolean hasCertificate,
            String currency,
            String price,
            String courseCode,
            String teaserVideoUrl,
            String prerequisites,
            List<String> takeaways) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.curriculum = curriculum;
        this.difficulty = difficulty;
        this.duration = duration;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.status = status;
        this.slug = slug;
        this.language = language;
        this.targetAudience = targetAudience;
        this.hasCertificate = hasCertificate;
        this.currency = currency;
        this.price = price;
        this.courseCode = courseCode;
        this.teaserVideoUrl = teaserVideoUrl;
        this.prerequisites = prerequisites;
        this.takeaways = takeaways;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getCurriculum() {
        return curriculum;
    }

    public void setCurriculum(String curriculum) {
        this.curriculum = curriculum;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTargetAudience() {
        return targetAudience;
    }

    public void setTargetAudience(String targetAudience) {
        this.targetAudience = targetAudience;
    }

    public boolean isHasCertificate() {
        return hasCertificate;
    }

    public void setHasCertificate(boolean hasCertificate) {
        this.hasCertificate = hasCertificate;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCourseCode() {
        return courseCode;
    }

    public void setCourseCode(String courseCode) {
        this.courseCode = courseCode;
    }

    public String getTeaserVideoUrl() {
        return teaserVideoUrl;
    }

    public void setTeaserVideoUrl(String teaserVideoUrl) {
        this.teaserVideoUrl = teaserVideoUrl;
    }

    public String getPrerequisites() {
        return prerequisites;
    }

    public void setPrerequisites(String prerequisites) {
        this.prerequisites = prerequisites;
    }

    public List<String> getTakeaways() {
        return takeaways;
    }

    public void setTakeaways(List<String> takeaways) {
        this.takeaways = takeaways;
    }
}