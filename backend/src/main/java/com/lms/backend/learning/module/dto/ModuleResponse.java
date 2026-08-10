package com.lms.backend.learning.module.dto;

public class ModuleResponse {

    private Long id;
    private String title;
    private String description;
    private Integer sortOrder;

    private Long courseId;
    private String courseTitle;

    public ModuleResponse() {
    }

    public ModuleResponse(
            Long id,
            String title,
            String description,
            Integer sortOrder,
            Long courseId,
            String courseTitle) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.sortOrder = sortOrder;
        this.courseId = courseId;
        this.courseTitle = courseTitle;
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

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseTitle() {
        return courseTitle;
    }

    public void setCourseTitle(String courseTitle) {
        this.courseTitle = courseTitle;
    }
}