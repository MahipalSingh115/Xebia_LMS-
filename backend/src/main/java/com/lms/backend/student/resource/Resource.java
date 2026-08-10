package com.lms.backend.student.resource;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "student_resources")
public class Resource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String courseName;
    private String moduleName;
    private String instructor;
    private String fileSize;
    private String fileType;
    private String uploadDate;
    private String lastUpdated;
    private Integer downloads;

    @Column(length = 1000)
    private String description;

    private Boolean previewSupported;

    public Resource() {}

    public Resource(String title, String courseName, String moduleName, String instructor, String fileSize, String fileType, String uploadDate, String lastUpdated, Integer downloads, String description, Boolean previewSupported) {
        this.title = title;
        this.courseName = courseName;
        this.moduleName = moduleName;
        this.instructor = instructor;
        this.fileSize = fileSize;
        this.fileType = fileType;
        this.uploadDate = uploadDate;
        this.lastUpdated = lastUpdated;
        this.downloads = downloads;
        this.description = description;
        this.previewSupported = previewSupported;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getFileSize() { return fileSize; }
    public void setFileSize(String fileSize) { this.fileSize = fileSize; }

    public String getFileType() { return fileType; }
    public void setFileType(String fileType) { this.fileType = fileType; }

    public String getUploadDate() { return uploadDate; }
    public void setUploadDate(String uploadDate) { this.uploadDate = uploadDate; }

    public String getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(String lastUpdated) { this.lastUpdated = lastUpdated; }

    public Integer getDownloads() { return downloads; }
    public void setDownloads(Integer downloads) { this.downloads = downloads; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Boolean getPreviewSupported() { return previewSupported; }
    public void setPreviewSupported(Boolean previewSupported) { this.previewSupported = previewSupported; }
}
