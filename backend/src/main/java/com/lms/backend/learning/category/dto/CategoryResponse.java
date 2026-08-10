package com.lms.backend.learning.category.dto;

import java.time.LocalDateTime;
import java.util.Base64;

import java.util.List;

public class CategoryResponse {

    private Long id;
    private String name;
    private String description;
    private String image; // base64-encoded for frontend display
    private String publishState;
    private String status;
    private String slug;
    private String parentCat;
    private String emoji;
    private String accentColor;
    private String longDesc;
    private boolean visibleCatalog;
    private boolean featured;
    private boolean allowEnroll;
    private boolean showNav;
    private String metaTitle;
    private String metaDesc;
    private String focusKeyword;
    private List<String> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public CategoryResponse() {
    }

    public CategoryResponse(Long id,
                            String name,
                            String description,
                            byte[] imageBytes,
                            String publishState,
                            String status,
                            String slug,
                            String parentCat,
                            String emoji,
                            String accentColor,
                            String longDesc,
                            boolean visibleCatalog,
                            boolean featured,
                            boolean allowEnroll,
                            boolean showNav,
                            String metaTitle,
                            String metaDesc,
                            String focusKeyword,
                            List<String> tags,
                            LocalDateTime createdAt,
                            LocalDateTime updatedAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.image = imageBytes != null
                ? "data:image/*;base64," + Base64.getEncoder().encodeToString(imageBytes)
                : null;
        this.publishState = publishState;
        this.status = status;
        this.slug = slug;
        this.parentCat = parentCat;
        this.emoji = emoji;
        this.accentColor = accentColor;
        this.longDesc = longDesc;
        this.visibleCatalog = visibleCatalog;
        this.featured = featured;
        this.allowEnroll = allowEnroll;
        this.showNav = showNav;
        this.metaTitle = metaTitle;
        this.metaDesc = metaDesc;
        this.focusKeyword = focusKeyword;
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    public String getPublishState() {
        return publishState;
    }

    public void setPublishState(String publishState) {
        this.publishState = publishState;
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

    public String getParentCat() {
        return parentCat;
    }

    public void setParentCat(String parentCat) {
        this.parentCat = parentCat;
    }

    public String getEmoji() {
        return emoji;
    }

    public void setEmoji(String emoji) {
        this.emoji = emoji;
    }

    public String getAccentColor() {
        return accentColor;
    }

    public void setAccentColor(String accentColor) {
        this.accentColor = accentColor;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public boolean isVisibleCatalog() {
        return visibleCatalog;
    }

    public void setVisibleCatalog(boolean visibleCatalog) {
        this.visibleCatalog = visibleCatalog;
    }

    public boolean isFeatured() {
        return featured;
    }

    public void setFeatured(boolean featured) {
        this.featured = featured;
    }

    public boolean isAllowEnroll() {
        return allowEnroll;
    }

    public void setAllowEnroll(boolean allowEnroll) {
        this.allowEnroll = allowEnroll;
    }

    public boolean isShowNav() {
        return showNav;
    }

    public void setShowNav(boolean showNav) {
        this.showNav = showNav;
    }

    public String getMetaTitle() {
        return metaTitle;
    }

    public void setMetaTitle(String metaTitle) {
        this.metaTitle = metaTitle;
    }

    public String getMetaDesc() {
        return metaDesc;
    }

    public void setMetaDesc(String metaDesc) {
        this.metaDesc = metaDesc;
    }

    public String getFocusKeyword() {
        return focusKeyword;
    }

    public void setFocusKeyword(String focusKeyword) {
        this.focusKeyword = focusKeyword;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}