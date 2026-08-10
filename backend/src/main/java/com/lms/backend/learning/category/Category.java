package com.lms.backend.learning.category;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import org.hibernate.annotations.BatchSize;
import com.lms.backend.learning.course.Course;
import java.util.List;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(length = 1000)
    private String description;

    @Column(name = "image", length = 16777215)
    private byte[] image;

    @Column(name = "publish_state", length = 30)
    private String publishState;

    @Column(nullable = false)
    private String status = "Active";

    @Column(length = 150)
    private String slug;

    @Column(name = "parent_category", length = 100)
    private String parentCat;

    @Column(length = 50)
    private String emoji;

    @Column(name = "accent_color", length = 50)
    private String accentColor;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDesc;

    @Column(name = "visible_catalog", nullable = false)
    private boolean visibleCatalog = true;

    @Column(nullable = false)
    private boolean featured = false;

    @Column(name = "allow_enroll", nullable = false)
    private boolean allowEnroll = true;

    @Column(name = "show_nav", nullable = false)
    private boolean showNav = false;

    @Column(name = "meta_title", length = 200)
    private String metaTitle;

    @Column(name = "meta_description", length = 1000)
    private String metaDesc;

    @Column(name = "focus_keyword", length = 200)
    private String focusKeyword;

    @ElementCollection
    @CollectionTable(name = "category_tags", joinColumns = @JoinColumn(name = "category_id"))
    @Column(name = "tag")
    @org.hibernate.annotations.BatchSize(size = 25)
    private List<String> tags;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @BatchSize(size = 25)
    private List<Course> courses;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public Category() {
    }

    public Category(Long id, String name, String description, byte[] image,
                    String status, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();

        if (this.status == null || this.status.isBlank()) {
            this.status = "Active";
        }
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
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

    public List<Course> getCourses() {
        return courses;
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }
}