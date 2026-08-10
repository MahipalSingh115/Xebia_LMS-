package com.lms.backend.learning.submodule.dto;

public class SubModuleResponse {

    private Long id;
    private String title;
    private String description;
    private Integer sortOrder;

    private Long moduleId;
    private String moduleTitle;

    public SubModuleResponse() {}

    public SubModuleResponse(
            Long id,
            String title,
            String description,
            Integer sortOrder,
            Long moduleId,
            String moduleTitle) {

        this.id = id;
        this.title = title;
        this.description = description;
        this.sortOrder = sortOrder;
        this.moduleId = moduleId;
        this.moduleTitle = moduleTitle;
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

    public Long getModuleId() {
        return moduleId;
    }

    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleTitle() {
        return moduleTitle;
    }

    public void setModuleTitle(String moduleTitle) {
        this.moduleTitle = moduleTitle;
    }
}