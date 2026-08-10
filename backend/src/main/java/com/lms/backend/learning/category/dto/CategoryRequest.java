package com.lms.backend.learning.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class CategoryRequest {

    @NotBlank(message = "Category name is required")
    @Size(min = 3, max = 100, message = "Category name must be between 3 and 100 characters")
    private String name;

    @Size(max = 1000, message = "Description cannot exceed 1000 characters")
    private String description;

    private String publishState;

    private String status;

    private String slug;

    private String parentCat;

    private String emoji;

    private String accentColor;

    private String longDesc;

    private Boolean visibleCatalog;

    private Boolean featured;

    private Boolean allowEnroll;

    private Boolean showNav;

    private String metaTitle;

    private String metaDesc;

    private String focusKeyword;

    private List<String> tags;

    public CategoryRequest() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status == null ? null : status.trim();
    }
    public String getPublishState() {
        return publishState;
    }

    public void setPublishState(String publishState) {
        this.publishState = publishState;
    }
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug == null ? null : slug.trim();
    }

    public String getParentCat() {
        return parentCat;
    }

    public void setParentCat(String parentCat) {
        this.parentCat = parentCat == null ? null : parentCat.trim();
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji == null ? null : emoji.trim();
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor == null ? null : accentColor.trim();
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc == null ? null : longDesc.trim();
    }

    public Boolean getVisibleCatalog() {
        return visibleCatalog;
    }

    public void setVisibleCatalog(Boolean visibleCatalog) {
        this.visibleCatalog = visibleCatalog;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public Boolean getAllowEnroll() {
        return allowEnroll;
    }

    public void setAllowEnroll(Boolean allowEnroll) {
        this.allowEnroll = allowEnroll;
    }

    public Boolean getShowNav() {
        return showNav;
    }

    public void setShowNav(Boolean showNav) {
        this.showNav = showNav;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle == null ? null : metaTitle.trim();
    }

    public String getMetaDesc() {
        return metaDesc;
    }

    public void setMetaDesc(String metaDesc) {
        this.metaDesc = metaDesc == null ? null : metaDesc.trim();
    }

    public String getFocusKeyword() {
        return focusKeyword;
    }

    public void setFocusKeyword(String focusKeyword) {
        this.focusKeyword = focusKeyword == null ? null : focusKeyword.trim();
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }
}